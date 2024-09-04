from sqlalchemy import Column, Integer, String, ForeignKey
from .base import Base


class Matricula(Base):
    __tablename__ = 'Matricula'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_filtro = Column(Integer, ForeignKey('Filtro.id'), nullable=False)
    cor_raca = Column(String(20), nullable=True)
    dependencia_administrativa = Column(String(20), nullable=True)
    quantidade = Column(Integer, nullable=True)
