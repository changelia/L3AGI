from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db

from exceptions import FineTuningNotFoundException
from models.fine_tuning import FineTuningModel
from typings.auth import UserAccount
from typings.fine_tuning import FineTuningInput, FineTuningOutput
from utils.auth import authenticate
from utils.fine_tuning import (convert_fine_tunings_to_fine_tuning_list,
                               convert_model_to_response)

router = APIRouter()


@router.post("", status_code=201, response_model=FineTuningOutput)
def create_fine_tuning(
    fine_tuning: FineTuningInput, auth: UserAccount = Depends(authenticate)
):
    fine_tuning_model = FineTuningModel.create_fine_tuning(
        db.session,
        fine_tuning,
        auth.user.id,
        auth.account.id,
    )

    return convert_model_to_response(
        FineTuningModel.get_fine_tuning_by_id(
            db.session, fine_tuning_model.id, auth.account.id
        )
    )


@router.put("/{id}", status_code=200, response_model=FineTuningOutput)
def update_fine_tuning(
    id: str, fine_tuning: FineTuningInput, auth: UserAccount = Depends(authenticate)
) -> FineTuningOutput:
    """
    Update an existing fine-tuning with configurations.

    Args:
        id (str): ID of the fine_tuning to update.
        fine_tuning (FineTuningInput): Data for updating the fine-tuning with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        FineTuningOutput: Updated fine-tuning object.
    """
    try:
        fine_tuning_model = FineTuningModel.update_fine_tuning(
            db.session,
            id,
            fine_tuning,
            auth.user.id,
            auth.account.id,
        )

        return convert_model_to_response(
            FineTuningModel.get_fine_tuning_by_id(
                db.session, fine_tuning_model.id, auth.account.id
            )
        )
    except FineTuningNotFoundException:
        raise HTTPException(status_code=404, detail="Fine-tuning not found")


@router.get("/{id}", response_model=FineTuningOutput)
def get_fine_tuning_by_id(
    id: UUID, auth: UserAccount = Depends(authenticate)
) -> FineTuningOutput:
    """
    Get a fine-tuning by its ID.

    Args:
        id (str): ID of the fine-tuning.
        auth (UserAccount): Authenticated user account.

    Returns:
        FineTuningOutput: Fine-tuning associated with the given ID.
    """
    fine_tuning_model = FineTuningModel.get_fine_tuning_by_id(
        db.session, id, auth.account.id
    )

    if not fine_tuning_model or fine_tuning_model.is_deleted:
        raise HTTPException(status_code=404, detail="Fine-tuning not found")

    return convert_model_to_response(fine_tuning_model)


@router.delete("/{fine_tuning_id}", status_code=200)
def delete_fine_tuning(fine_tuning_id: UUID, auth: UserAccount = Depends(authenticate)):
    """
    Delete a fine-tuning by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        fine_tuning_id (str): ID of the fine-tuning to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        FineTuningModel.delete_by_id(
            db.session, id=fine_tuning_id, account_id=auth.account.id
        )
        return {"message": "Fine-tuning deleted successfully"}
    except FineTuningNotFoundException:
        raise HTTPException(status_code=404, detail="Fine-tuning not found")


@router.get("", response_model=List[FineTuningOutput])
def get_fine_tunings(
    auth: UserAccount = Depends(authenticate),
) -> List[FineTuningOutput]:
    """
    Get all fine-tunings by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[FineTuningOutput]: List of fine-tunings associated with the account.
    """
    fine_tuning_models = FineTuningModel.get_fine_tunings(db.session, auth.account.id)
    return convert_fine_tunings_to_fine_tuning_list(fine_tuning_models)
