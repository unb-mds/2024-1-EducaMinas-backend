import {
  RankingRepository,
  RankingRepositoryOutput,
} from '../../repositories/rankingRepository';
import { RankingInput } from '../../services/rankingServices';

export class RankingRepositoryMemory extends RankingRepository {
  public DATA_IN_MEMORY: RankingRepositoryOutput[] = [];
  // filtrando os dados de acordo com a etapa e ano
  async fetch(input: RankingInput): Promise<RankingRepositoryOutput[]> {
    const { ano, etapa } = input;
    const response = this.DATA_IN_MEMORY.filter(
      (item) => item.etapa === etapa && item.ano === ano,
    );
    return response;
  }
}
