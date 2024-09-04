from abc import ABC
from sqlalchemy import create_engine
from models.base import Base


class ConnectorService(ABC):
    ...


class PostgreSQLConnector(ConnectorService):
    def __init__(self, host, port, database, user, password):
        self.host = host
        self.database = database
        self.user = user
        self.password = password
        self.port = port
        self.connection = None

    def connect(self):
        try:
            self.connection = create_engine(
                f"postgresql+psycopg2://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}", echo=True)
            print("Connected to PostgreSQL via SQLAlchemy")
            # Configuração do banco de dados
            Base.metadata.create_all(self.connection)  # noqa: F405
            return self.connection
        except Exception as e:
            print("Error connecting to PostgreSQL: %s", e)

    def get_connection(self):
        return self.connection
