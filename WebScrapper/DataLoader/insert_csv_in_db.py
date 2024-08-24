import pandas as pd
import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_value

# Caminho onde os arquivos CSV estão localizados
path = os.path.abspath(os.path.join(os.getcwd(), "../oracle_data"))
# Padrão de nome dos arquivos
pattern_name = 'Tabela Dinâmica - Matriculas dep adm 2023 EF1'

metadata = MetaData()

config = dotenv_values("./.env")
username = config.get("DATABASE_USERNAME")
password = config.get("DATABASE_PASSWORD")
dbname = config.get("DATABASE_NAME")
port = config.get("DATABASE_PORT")
host = config.get("DATABASE_HOST")



# Configurar a conexão ao banco de dados
engine = create_engine(f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{dbname}", echo=True)

# Listar todos os arquivos na pasta que começam com o padrão especificado
arquivos_csv = [f for f in os.listdir(path) if f.startswith(pattern_name) and f.endswith('.csv')]

# Loop sobre cada arquivo e inseri-los no banco de dados
for arquivo in arquivos_csv:
    # Ler o arquivo CSV
    caminho_completo = os.path.join(path, arquivo)
    df = pd.read_csv(caminho_completo, sep=';')
    
    # Inserir os dados no banco de dados
    #df.to_sql('nome_da_tabela', con=engine, if_exists='append', index=False)
    
    # Somar localização

df = df.drop('Categoria 1 - Ordenação', axis=1)

print(df)
