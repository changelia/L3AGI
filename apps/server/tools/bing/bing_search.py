from typing import Optional, Type
from pydantic import BaseModel, Field
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from tools.base import BaseTool
from langchain.utilities.bing_search import BingSearchAPIWrapper

class BingSearchSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for Bing search.",
    )


class BingSearchTool(BaseTool):
    name = "Bing Search"
    
    description = (
        "A tool for performing a Bing search."
        "useful for when you need to answer questions about current events"
    )

    args_schema: Type[BingSearchSchema] = BingSearchSchema

    tool_id = "88be4eef-6d3c-4eaa-b7a5-a30dda650c14"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search Bing and return the results."""
        search = BingSearchAPIWrapper()
        search.bing_search_url = "https://api.bing.microsoft.com/v7.0/search"
        search.bing_subscription_key = self.get_env_key("BING_SUBSCRIPTION_KEY")
        return search.run(query)

