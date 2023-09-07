import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

type TeamOfAgentsCardProps = {
  title: string
  subTitle: string
  onEditClick: () => void
  onDeleteClick: () => void
  onChatClick: () => void
}

const TeamOfAgentsCard = ({
  title,
  subTitle,
  onEditClick,
  onDeleteClick,
  onChatClick,
}: // TODO: add delete, view
TeamOfAgentsCardProps) => {
  // TODO: add agents to the card with avatars

  return (
    <StyledCard>
      <StyledTextWrapper>
        <Typography
          value={title}
          type={Typography.types.P}
          size={Typography.sizes.lg}
          customColor={'#FFF'}
        />
        <Typography
          value={subTitle}
          type={Typography.types.P}
          size={Typography.sizes.md}
          customColor={'rgba(255,255,255, 0.8)'}
        />
      </StyledTextWrapper>
      <StyledButtonsWrapper>
        <Button onClick={onChatClick} size={Button.sizes.SMALL}>
          Chat
        </Button>
        <IconButton
          onClick={onEditClick}
          icon={() => <Edit />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
        />
        <IconButton
          onClick={onDeleteClick}
          icon={() => <Delete />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
        />
      </StyledButtonsWrapper>
    </StyledCard>
  )
}

export default TeamOfAgentsCard

const StyledCard = styled.div`
  width: 320px;
  min-width: 320px;
  height: 150px;
  min-height: 150px;

  background: rgba(0, 0, 0, 0.2);
  /* backdrop-filter: blur(10px); */
  border: 1px solid #5d6a7d;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */

  padding: 20px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 2px;

  margin-left: auto;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`
