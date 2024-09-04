import {
  IndicatorRepository,
  IndicatorRepositoryOutput,
} from '../../../adapters/repositories/indicatorRepository';
import { IndicatorInput } from '../../../application/services/indicatorServices';

export class IndicatorRepositoryMemory extends IndicatorRepository {
  public DATA_IN_MEMORY: IndicatorRepositoryOutput[] = [];

  async fetch(input: IndicatorInput): Promise<IndicatorRepositoryOutput[]> {
    const { municipio, etapa } = input;
    const response = this.DATA_IN_MEMORY.filter(
      (item) => item.etapa === etapa && item.municipio === municipio,
    );
    return response;
  }
}
