import { RankingInput } from '../../application/services/rankingServices';

export type RankingRepositoryOutput = {
  ano: number;
  raca: string;
  rede: string;
  etapa: string;
  matricula: number;
  municipio: string;
};

export abstract class RankingRepository {
  abstract fetch(input: RankingInput): Promise<RankingRepositoryOutput[]>;
}
