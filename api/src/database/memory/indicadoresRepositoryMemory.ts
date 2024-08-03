import {
  IndicadoresRepository,
  IndicadoresRepositoryOutput,
} from '../../repositories/indicadoresRepository';
import { IndicadoresInput } from '../../services/indicadoresServices';

export class IndicadoresRepositoryMemory extends IndicadoresRepository {
  public DATA_IN_MEMORY: IndicadoresRepositoryOutput[] = [];

  async fetch(input: IndicadoresInput): Promise<IndicadoresRepositoryOutput[]> {
    const { municipio, etapa, indicador, rede } = input;
    const response = this.DATA_IN_MEMORY.filter(
      (item) =>
        item.etapa === etapa &&
        item.indicador === indicador &&
        item.rede === rede &&
        item.municipio === municipio,
    );
    return response;
  }
}
