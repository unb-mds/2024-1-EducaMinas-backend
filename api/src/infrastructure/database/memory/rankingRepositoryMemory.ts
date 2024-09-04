import {
  RankingRepository,
  RankingRepositoryOutput,
} from '../../../adapters/repositories/rankingRepository';
import { RankingInput } from '../../../application/services/rankingServices';

export class RankingRepositoryMemory extends RankingRepository {
  public DATA_IN_MEMORY: RankingRepositoryOutput[] = [];
  async fetch(input: RankingInput): Promise<RankingRepositoryOutput[]> {
    const { ano, etapa } = input;
    const response = this.DATA_IN_MEMORY.filter(
      (item) => item.etapa === etapa && item.ano === ano,
    );
    return response;
  }
}
