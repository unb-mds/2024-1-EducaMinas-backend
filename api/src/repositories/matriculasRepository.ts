import { MatriculasInput } from '../services/matriculasServices';

export type MatriculasRepositoryOutput = {
  ano: number;
  raca: string;
  rede: string;
  etapa: string;
  matricula: number;
  municipio: string;
};

export abstract class MatriculasRepository {
  abstract fetch(input: MatriculasInput): Promise<MatriculasRepositoryOutput[]>;
}
