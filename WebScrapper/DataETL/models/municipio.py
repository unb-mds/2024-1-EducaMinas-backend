from sqlalchemy import Column, Integer, String
from .base import Base


class Municipio(Base):
    __tablename__ = 'Municipio'
    id = Column(Integer, primary_key=True, autoincrement=True, default=None)
    nome = Column(String, nullable=False, unique=True)
    UF = Column(String, nullable=False)
