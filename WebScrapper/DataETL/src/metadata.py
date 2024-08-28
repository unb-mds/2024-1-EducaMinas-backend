from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, Float, String, ForeignKey, UniqueConstraint


class Base(DeclarativeBase):
    ...


class Municipio(Base):
    __tablename__ = 'Municipio'
    id = Column(Integer, primary_key=True, autoincrement=True, default=None)
    nome = Column(String, nullable=False, unique=True)
    UF = Column(String, nullable=False)


class Filtro(Base):
    __tablename__ = 'Filtro'

    id = Column(Integer, primary_key=True, autoincrement=True)
    municipio_id = Column(Integer, ForeignKey(
        'Municipio.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    etapa_de_ensino = Column(String(5), nullable=False)
    ano = Column(Integer, nullable=False)

    __table_args__ = (UniqueConstraint(
        'municipio_id', 'etapa_de_ensino', 'ano', name='unique_municipio_etapa_ano'),)


class Matricula(Base):
    __tablename__ = 'Matricula'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_filtro = Column(Integer, ForeignKey('Filtro.id'), nullable=False)
    cor_raca = Column(String(20), nullable=True)
    dependencia_administrativa = Column(String(20), nullable=True)
    quantidade = Column(Integer, nullable=True)


class Indicador(Base):
    __tablename__ = 'Indicador'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_filtro = Column(Integer, ForeignKey('Filtro.id'), nullable=False)
    dependencia_administrativa = Column(String(20), nullable=True)
    taxa_de_aprovacao = Column(Float, nullable=True)
    taxa_de_reprovacao = Column(Float, nullable=True)
    taxa_de_abandono = Column(Float, nullable=True)


def create_metadata(engine):
    Base.metadata.create_all(engine)
