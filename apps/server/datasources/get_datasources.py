from datasources.postgres.postgres import PostgresDatasource
from datasources.mysql.mysql import MySQLDatasource
from datasources.base import DatasourceType, DatasourceCategory

DATASOURCES = [
    PostgresDatasource(),
    MySQLDatasource(),
]

COMING_SOON = [
    {
        "is_system": True,
        "is_active": False,
        "name": "File",
        "description": "Upload a file",
        "category": DatasourceCategory.FILE,
        "source_type": DatasourceType.UPLOAD_FILE,
    },
    {
        "is_system": True,
        "is_active": False,
        "name": "Crawler",
        "description": "Crawl the web page",
        "category": DatasourceCategory.CRAWLER,
        "source_type": DatasourceType.WEB_PAGE,
    },
    {
        "is_system": True,
        "is_active": False,
        "name": "Notion",
        "description": "Notion",
        "category": DatasourceCategory.APPLICATION,
        "source_type": DatasourceType.NOTION,
    },
    {
        "is_system": True,
        "is_active": False,
        "name": "Shopify",
        "description": "Shopify",
        "category": DatasourceCategory.APPLICATION,
        "source_type": DatasourceType.SHOPIFY,
    }
]

def get_all_datasources():
    """Return a list of all datasources."""
    result = []

    for datasource in DATASOURCES:
        result.append(
            {
                "is_system": True,
                "is_active": datasource.is_active,
                "name": datasource.name,
                "description": datasource.description,
                "category": datasource.category,
                "source_type": datasource.type,
                "fields": [
                    {
                        "label": env_key.label,
                        "key": env_key.key,
                        "type": str(env_key.key_type),
                        "is_required": env_key.is_required,
                        "is_secret": env_key.is_secret,
                    }
                    for env_key in datasource.get_env_keys()
                ],
            }
        )


    result.extend(COMING_SOON)

    return result
