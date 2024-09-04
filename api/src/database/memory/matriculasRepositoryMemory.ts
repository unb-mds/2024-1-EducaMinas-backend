import {
  MatriculasRepository,
  MatriculasRepositoryOutput,
} from '../../repositories/matriculasRepository';
import { MatriculasInput } from '../../services/matriculasServices';

export class MatriculasRepositoryMemory extends MatriculasRepository {
  public DATA_IN_MEMORY: MatriculasRepositoryOutput[] = [];

  async fetch(input: MatriculasInput): Promise<MatriculasRepositoryOutput[]> {
    const { municipio, etapa } = input;
    const response = this.DATA_IN_MEMORY.filter(
      (item) => item.etapa === etapa && item.municipio === municipio,
    );
    return response;
  }
}
