import { supabase } from '../../..';
import {
  IndicatorRepository,
  IndicatorRepositoryOutput,
} from '../../../adapters/repositories/indicatorRepository';
import { IndicatorInput } from '../../../application/services/indicatorServices';

export class IndicatorRepositoryPSQL extends IndicatorRepository {
  async fetch(input: IndicatorInput): Promise<IndicatorRepositoryOutput[]> {
    const { data, error } = await supabase
      .from('Filtro')
      .select(
        `
      id,
      municipio_id,
      etapa_de_ensino,
      ano,
      Indicador(dependencia_administrativa, taxa_de_aprovacao, taxa_de_reprovacao, taxa_de_abandono)
      `,
      )
      .eq('municipio_id', Number(input.municipio))
      .eq('etapa_de_ensino', input.etapa);
    if (error) {
      throw new Error(error.message);
    } else {
      const result: IndicatorRepositoryOutput[] = data
        .map((filtro: any) => {
          return filtro.Indicador.map((mr: any) => ({
            ano: filtro.ano,
            rede: mr.dependencia_administrativa,
            etapa: filtro.etapa_de_ensino,
            taxa_de_aprovacao: mr.taxa_de_aprovacao,
            taxa_de_reprovacao: mr.taxa_de_reprovacao,
            taxa_de_abandono: mr.taxa_de_abandono,
            municipio: filtro.municipio_id,
          }));
        })
        .flat();
      return result;
    }
  }
}
