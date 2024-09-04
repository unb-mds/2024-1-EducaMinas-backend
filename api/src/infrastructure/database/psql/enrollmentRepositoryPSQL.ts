import { supabase } from '../../..';
import {
  EnrollmentRepository,
  EnrollmentRepositoryOutput,
} from '../../../adapters/repositories/enrollmentRepository';
import { EnrollmentInput } from '../../../application/services/enrollmentServices';

export class EnrollmentRepositoryPSQL extends EnrollmentRepository {
  async fetch(input: EnrollmentInput): Promise<EnrollmentRepositoryOutput[]> {
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
      .eq('municipio_id', Number(input.municipio))
      .eq('etapa_de_ensino', input.etapa)
      .gt('ano', 2019);
    if (error) {
      throw new Error(error.message);
    } else {
      const result: EnrollmentRepositoryOutput[] = data
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
