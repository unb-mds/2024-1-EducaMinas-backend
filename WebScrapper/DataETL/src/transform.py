import pandas as pd
from abc import ABC, abstractmethod


class TransformService(ABC):
    @abstractmethod
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        pass


class StandardizeMunicipioDataTransformer(TransformService):
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        df = df[df['UF'] == 'MG']
        df = df.drop_duplicates()
        df = df.rename(columns={
            'Código do Município': 'id',
            'Nome do Município': 'nome',
        })
        return df
