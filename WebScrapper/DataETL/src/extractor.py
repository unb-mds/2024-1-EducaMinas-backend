from abc import ABC, abstractmethod
import pandas as pd


class ExtractService(ABC):
    @abstractmethod
    def extract(self) -> pd.DataFrame:
        pass


class MunicipioExcelExtractor(ExtractService):
    def __init__(self, file_name_path: str):
        self.file_name_path = file_name_path

    def extract(self) -> pd.DataFrame:
        try:
            df = pd.read_excel(self.file_name_path,
                               skiprows=5,
                               usecols=['UF', 'Código do Município', 'Nome do Município'])
            return df
        except Exception as e:
            print(f"Erro ao extrair os dados: {e}")
            return pd.DataFrame()  # Retorna DataFrame vazio no caso de erro


class IndicadorExcelExtractor(ExtractService):
    def __init__(self, file_name_path) -> None:
        self.file_name_path = file_name_path

    def extract(self) -> pd.DataFrame:
        try:
            df = pd.read_excel(self.file_name_path,
                               skiprows=8,
                               usecols=["NU_ANO_CENSO",
                                        "SG_UF",
                                        "CO_MUNICIPIO",
                                        "NO_MUNICIPIO",
                                        "NO_CATEGORIA",
                                        "NO_DEPENDENCIA",
                                        "1_CAT_FUN_AI",
                                        "1_CAT_FUN_AF",
                                        "1_CAT_MED",
                                        "2_CAT_FUN_AI",
                                        "2_CAT_FUN_AF",
                                        "2_CAT_MED",
                                        "3_CAT_FUN_AI",
                                        "3_CAT_FUN_AF",
                                        "3_CAT_MED"]
                               )
            return df
        except Exception as e:
            print(f"Erro ao extrair os dados: {e}")
            return pd.DataFrame()  # Retorna DataFrame vazio no caso de erro
