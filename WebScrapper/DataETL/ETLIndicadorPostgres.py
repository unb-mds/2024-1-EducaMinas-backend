import os
from src.etl import ETL
from src.config import Config
from dotenv import dotenv_values

env_path = os.path.join(os.path.dirname(__file__), '.env')
env = dotenv_values(env_path)
host = env.get("DATABASE_HOST")
port = env.get("DATABASE_PORT")
dbname = env.get("DATABASE_NAME")
username = env.get("DATABASE_USERNAME")
password = env.get("DATABASE_PASSWORD")

script_dir = os.path.dirname(os.path.realpath(__file__))
source_path = os.path.abspath(os.path.join(script_dir, "../indicators_data"))
all_indicators_file_path = [
    os.path.join(source_path, i) for i in os.listdir(source_path)]


for file_name_path in all_indicators_file_path:
    # Configuration
    config = Config(
        extractor_type="IndicadorExcelExtractor",
        loader_type="DerivedFromFilterToPostgresLoader",
        transformers=["StandardizeIndicadorDataTransformer"],
        extractor={
            "file_name_path": file_name_path
        },
        loader={
            "connection_details": {
                "host": f"{host}",
                "port": f"{port}",
                "database": f"{dbname}",
                "user": f"{username}",
                "password": f"{password}"
            }
        }
    )

    # etl process
    etl_process = ETL(config=config)
    etl_process.process()
