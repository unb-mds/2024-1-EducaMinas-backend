import { IndicatorInput } from '../../application/services/indicatorServices';

export type IndicatorRepositoryOutput = {
  ano: number;
  rede: string;
  etapa: string;
  taxa_de_aprovacao: number;
  taxa_de_reprovacao: number;
  taxa_de_abandono: number;
  municipio: string;
};

export abstract class IndicatorRepository {
  abstract fetch(input: IndicatorInput): Promise<IndicatorRepositoryOutput[]>;
}
