import pandas as pd
import numpy as np
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


class StandardizeMatriculaDataTransformer(TransformService):
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        self.df = df
        self.__rename()
        self.__filter()
        self.__melt()
        self.__pivot()
        self.__standard_rename()
        return self.df


class StandardizeIndicadorDataTransformer(TransformService):
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        self.df = df
        self.__rename()
        self.__filter()
        self.__melt()
        self.__pivot()
        self.__standard_rename()
        return self.df

    def __rename(self):
        header_map = {'NU_ANO_CENSO': 'ano',
                      'SG_UF': 'UF',
                      'CO_MUNICIPIO': 'municipio_id',
                      'NO_MUNICIPIO': 'nome',
                      'NO_CATEGORIA': 'localização',
                      'NO_DEPENDENCIA': 'dependencia_administrativa',
                      '1_CAT_FUN_AI': 'aprovacao_EF1',
                      '1_CAT_FUN_AF': 'aprovacao_EF2',
                      '1_CAT_MED': 'aprovacao_EM',
                      '2_CAT_FUN_AI': 'reprovacao_EF1',
                      '2_CAT_FUN_AF': 'reprovacao_EF2',
                      '2_CAT_MED': 'reprovacao_EM',
                      '3_CAT_FUN_AI': 'abandono_EF1',
                      '3_CAT_FUN_AF': 'abandono_EF2',
                      '3_CAT_MED': 'abandono_EM'
                      }
        self.df.rename(columns=header_map, inplace=True)

    def __filter(self):
        self.df = self.df[self.df['UF'] == 'MG']
        self.df = self.df[self.df['localização'] == 'Total']
        self.df = self.df.drop(columns=['localização'])
        self.df['municipio_id'] = self.df['municipio_id'].astype(int)

    def __melt(self):
        self.df = pd.melt(
            self.df,
            id_vars=['ano', 'UF', 'municipio_id',
                     'nome', 'dependencia_administrativa'],
            value_vars=['aprovacao_EF1', 'aprovacao_EF2', 'aprovacao_EM',
                        'reprovacao_EF1', 'reprovacao_EF2', 'reprovacao_EM',
                        'abandono_EF1', 'abandono_EF2', 'abandono_EM'],
            var_name='tipo_etapa',
            value_name='valor'
        )
        self.df[['tipo', 'etapa_de_ensino']
                ] = self.df['tipo_etapa'].str.split('_', expand=True)
        self.df.drop('tipo_etapa', axis=1, inplace=True)

    def __pivot(self):
        self.df = self.df.pivot_table(
            index=['ano', 'UF', 'municipio_id', 'nome',
                   'dependencia_administrativa', 'etapa_de_ensino'],
            columns='tipo',
            values='valor',
            aggfunc='first'
        ).reset_index()

    def __standard_rename(self):
        self.df.columns.name = None
        self.df.rename(columns={'aprovacao': 'taxa_de_aprovacao', 'reprovacao': 'taxa_de_reprovacao',
                                'abandono': 'taxa_de_abandono', 'nome': 'Município'}, inplace=True)
        with pd.option_context('future.no_silent_downcasting', True):
            self.df['taxa_de_aprovacao'] = self.df['taxa_de_aprovacao'].replace({
                '--': np.nan})
            self.df['taxa_de_reprovacao'] = self.df['taxa_de_reprovacao'].replace({
                '--': np.nan})
            self.df['taxa_de_abandono'] = self.df['taxa_de_abandono'].replace({
                '--': np.nan})

        # substitui NaN por None
        self.df = self.df.where(pd.notnull(self.df), None)
