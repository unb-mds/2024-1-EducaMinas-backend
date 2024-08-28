import os
from src.etl import ETL
from src.config import Config


script_dir = os.path.dirname(os.path.realpath(__file__))
source_path = os.path.abspath(os.path.join(script_dir, "../indicators_data"))

source_file = os.path.join(source_path, 'tx_rend_municipios_2023.xlsx')
dest_file = os.path.join(script_dir, 'municipio_id.py')

# Configuration
config = Config(
    extractor_type="MunicipioExcelExtractor",
    loader_type="PandasToJSONMunicipioRefererenceLoader",
    transformers=["StandardizeMunicipioDataTransformer"],
    extractor={
        "file_name_path": source_file
    },
    loader={
        "file_name_path": dest_file
    }
)

# etl process
etl_process = ETL(config=config)
etl_process.process()
