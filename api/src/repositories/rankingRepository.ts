import { RankingInput } from '../services/rankingServices';

// output vindo do banco de dados
export type RankingRepositoryOutput = {
  ano: number;
  raca: string;
  etapa: string;
  municipio: string;
  reprovacao: number;
  evasao: number;
  atraso: number;
};

export abstract class RankingRepository {
  abstract fetch(input: RankingInput): Promise<RankingRepositoryOutput[]>;
}
