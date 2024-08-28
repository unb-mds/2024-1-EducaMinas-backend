import { IndicadoresInput } from '../services/indicadoresServices';

export type IndicadoresRepositoryOutput = {
  ano: number;
  rede: string;
  etapa: string;
  taxa_de_aprovacao: number;
  taxa_de_reprovacao: number;
  taxa_de_abandono: number;
  municipio: string;
};

export abstract class IndicadoresRepository {
  abstract fetch(input: IndicadoresInput): Promise<IndicadoresRepositoryOutput[]>;
}
