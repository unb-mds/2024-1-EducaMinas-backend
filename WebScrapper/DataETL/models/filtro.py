from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from .base import Base


class Filtro(Base):
    __tablename__ = 'Filtro'

    id = Column(Integer, primary_key=True, autoincrement=True)
    municipio_id = Column(Integer, ForeignKey(
        'Municipio.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    etapa_de_ensino = Column(String(5), nullable=False)
    ano = Column(Integer, nullable=False)

    __table_args__ = (UniqueConstraint(
        'municipio_id', 'etapa_de_ensino', 'ano', name='unique_municipio_etapa_ano'),)
