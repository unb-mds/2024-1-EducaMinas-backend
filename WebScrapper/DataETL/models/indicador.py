from sqlalchemy import Column, Integer, Float, String, ForeignKey
from .base import Base


class Indicador(Base):
    __tablename__ = 'Indicador'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_filtro = Column(Integer, ForeignKey('Filtro.id'), nullable=False)
    dependencia_administrativa = Column(String(20), nullable=True)
    taxa_de_aprovacao = Column(Float, nullable=True)
    taxa_de_reprovacao = Column(Float, nullable=True)
    taxa_de_abandono = Column(Float, nullable=True)
