import { supabase } from '../..';
import {
  MatriculasRepository,
  MatriculasRepositoryOutput,
} from '../../repositories/matriculasRepository';
import { MatriculasInput } from '../../services/matriculasServices';

export class MatriculasRepositoryPSQL extends MatriculasRepository {
  async fetch(input: MatriculasInput): Promise<MatriculasRepositoryOutput[]> {
    const { data, error } = await supabase
      .from('Filtro')
      .select(
        `
      id,
      municipio_id,
      etapa_de_ensino,
      ano,
      Matricula( id, cor_raca, quantidade, dependencia_administrativa)
      `,
      )
      .eq('municipio_id', Number(input.municipio)) // Filtrando por município
      .eq('etapa_de_ensino', input.etapa) // Filtrando por etapa de ensino
      .gt('ano', 2019);
    if (error) {
      throw new Error(error.message);
    } else {
      // Processar e retornar os dados no formato esperado
      const result: MatriculasRepositoryOutput[] = data
        .map((filtro: any) => {
          return filtro.Matricula.map((mr: any) => ({
            ano: filtro.ano,
            raca: mr.cor_raca,
            rede: mr.dependencia_administrativa,
            etapa: filtro.etapa_de_ensino,
            matricula: mr.quantidade,
            municipio: filtro.municipio_id,
          }));
        })
        .flat();
      return result;
    }
  }
}
