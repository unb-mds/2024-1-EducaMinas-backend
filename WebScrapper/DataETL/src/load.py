import json
import pandas as pd
from abc import ABC, abstractmethod
from .connect import PostgreSQLConnector
from models import Filtro, Matricula, Indicador
from sqlalchemy.orm import Session


class LoadService(ABC):
    @abstractmethod
    def load(self, df: pd.DataFrame):
        pass


class PandasToJSONMunicipioRefererenceLoader(LoadService):
    def __init__(self, file_name_path):
        self.file_name_path = file_name_path

    def load(self, df: pd.DataFrame):
        df['id'] = df['id'].astype(int)
        municipios_map = dict(zip(df['nome'], df['id']))

        # Tratamento de caso especial
        # Esse municipio possui duas formas de se escrever
        municipios_map['Dona Eusébia'] = 3122900
        municipios_map['São Thomé das Letras'] = 3165206
        municipios_map["Pingo d'Água"] = 3150539
        print(municipios_map)

        # Salvamento do dicionário em arquivo Python
        content = f'municipio_map = {
            json.dumps(
                municipios_map,
                indent=4,
                ensure_ascii=False
            )}'

        try:
            with open(self.file_name_path, 'w') as file:
                file.write(content)
            print(f"\nDicionário salvo em '{self.file_name_path}'")
        except Exception as e:
            print(f"Erro ao salvar o arquivo: {e}")


class MunicipioToPostgresLoader(LoadService):
    def __init__(self, connection_details):
        self.connector = PostgreSQLConnector(**connection_details)

    def load(self, df: pd.DataFrame):
        try:
            df.to_sql('Municipio',
                      con=self.connector.connect(),
                      if_exists='append',
                      index=False)
            print("Dados carregados no banco de dados com sucesso!")
        except Exception as e:
            print(f"Erro ao carregar os dados no banco de dados: {e}")

# class IndicadorToPostgresLoader(LoadService):


class DerivedFromFilterToPostgresLoader(LoadService):
    def __init__(self, connection_details):
        self.connector = PostgreSQLConnector(**connection_details)
        self.connector.connect()

    def load(self, df: pd.DataFrame):
        try:
            self.__bulk_insert_data(df)
        except Exception as e:
            print(f"Erro ao carregar os dados no banco de dados: {e}")

    def __get_DB_existing_filters(self):
        # Obtém todos os filtros existentes no banco de dados
        with Session(self.connector.get_connection()) as session:
            existing_filtros = session.query(Filtro).all()
        # Converte em um dicionário para acesso rápido
        filter_dict = {(f.municipio_id, f.etapa_de_ensino, f.ano):
                       f.id for f in existing_filtros}
        return filter_dict

    def __get_row_id_filter(self, row, session):
        filter_key = (row['municipio_id'],
                      row['etapa_de_ensino'], row['ano'])

        if filter_key in self.__filter_dict:
            # Filtro já existe, usar o ID existente.
            id_filter = self.__filter_dict[filter_key]
        else:
            # Criar novo e adicionar no dicionario
            filtro = Filtro(
                municipio_id=row['municipio_id'], etapa_de_ensino=row['etapa_de_ensino'], ano=row['ano'])
            session.add(filtro)
            session.flush()
            id_filter = filtro.id
            self.__filter_dict[filter_key] = id_filter
            return id_filter

    def __get_table_type(self, row, id_filter, DataFrame):
        if 'taxa_de_aprovacao' in DataFrame:
            indicador = Indicador(id_filtro=id_filter,
                                  dependencia_administrativa=row['dependencia_administrativa'],
                                  taxa_de_aprovacao=row['taxa_de_aprovacao'],
                                  taxa_de_reprovacao=row['taxa_de_reprovacao'],
                                  taxa_de_abandono=row['taxa_de_abandono'])
            return indicador
        if 'quantidade' in DataFrame:
            matricula = Matricula(id_filtro=id_filter,
                                  cor_raca=row['cor_raca'],
                                  dependencia_administrativa=row['dependencia_administrativa'],
                                  quantidade=row['quantidade'])
            return matricula
        raise ValueError("The pattern must follow the skeleton")

    def __bulk_insert_data(self, full_table_data: pd.DataFrame, current_file: str = None):
        self.__filter_dict = self.__get_DB_existing_filters()
        with Session(self.connector.get_connection()) as session:
            table_objs = []

            # Processar cada linha do DataFrame
            for _, row in full_table_data.iterrows():
                # Obter ou criar o filtro e obter seu ID
                id_filter = self.__get_row_id_filter(row=row, session=session)
                table_type = self.__get_table_type(
                    row=row,
                    id_filter=id_filter,
                    DataFrame=full_table_data)
                table_objs.append(table_type)
            # Inserir em lote
            session.bulk_save_objects(table_objs)
            session.commit()
