import pandas as pd
import os
from sqlalchemy import create_engine

# Defina o caminho onde os arquivos CSV estão localizados
path = '~/Downloads'

# Defina o padrão de nome dos arquivos
pattern_name = 'Tabela Dinâmica - Localidade por 2 Categorias'

# Configurar a conexão ao banco de dados
engine = create_engine('dialeto+driver://usuario:senha@host:porta/nome_do_banco')

# Listar todos os arquivos na pasta que começam com o padrão especificado
arquivos_csv = [f for f in os.listdir(path) if f.startswith(pattern_name) and f.endswith('.csv')]

# Loop sobre cada arquivo e inseri-los no banco de dados
for arquivo in arquivos_csv:
    # Ler o arquivo CSV
    caminho_completo = os.path.join(path, arquivo)
    df = pd.read_csv(caminho_completo)
    
    # Inserir os dados no banco de dados
    df.to_sql('nome_da_tabela', con=engine, if_exists='append', index=False)
