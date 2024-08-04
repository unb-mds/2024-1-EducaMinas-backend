import { IndicadoresInput } from '../services/indicadoresServices';

export type IndicadoresRepositoryOutput = {
  ano: number;
  indicador: string;
  raca: string;
  rede: string;
  etapa: string;
  valor: number;
  municipio: string;
};

export abstract class IndicadoresRepository {
  abstract fetch(input: IndicadoresInput): Promise<IndicadoresRepositoryOutput[]>;
}
