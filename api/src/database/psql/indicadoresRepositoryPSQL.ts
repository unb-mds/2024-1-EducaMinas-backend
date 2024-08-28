import { supabase } from '../..';
import {
  IndicadoresRepository,
  IndicadoresRepositoryOutput,
} from '../../repositories/indicadoresRepository';
import { IndicadoresInput } from '../../services/indicadoresServices';

export class IndicadoresRepositoryPSQL extends IndicadoresRepository {
  async fetch(input: IndicadoresInput): Promise<IndicadoresRepositoryOutput[]> {
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
      .eq('etapa_de_ensino', input.etapa); // Filtrando por município
    if (error) {
      throw new Error(error.message);
    } else {
      // Processar e retornar os dados no formato esperado
      const result: IndicadoresRepositoryOutput[] = data
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
