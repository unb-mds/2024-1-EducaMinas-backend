import { supabase } from '../..';
import {
  RankingRepository,
  RankingRepositoryOutput,
} from '../../repositories/rankingRepository';
import { RankingInput } from '../../services/rankingServices';

export class RankingRepositoryPSQL extends RankingRepository {
  async fetch(input: RankingInput): Promise<RankingRepositoryOutput[]> {
    const { data: idFiltro, error: municipiosError } = await supabase
      .from('Filtro')
      .select('*')
      .eq('ano', input.ano)
      .eq('etapa_de_ensino', input.etapa);

    if (municipiosError) {
      throw new Error(`Erro ao obter filtros: ${municipiosError.message}`);
    }

    const filterIds = idFiltro.map((idFiltro) => idFiltro.id);
    const municipioIds = idFiltro.map((idFiltro) => idFiltro.municipio_id);

    const racas = ['Branca', 'Preta', 'Parda'];

    const { data: matriculas, error: matriculasError } = await supabase
      .from('Matricula')
      .select('*')
      .in('cor_raca', racas)
      .in('id_filtro', filterIds);

    if (matriculasError) {
      throw new Error(`Erro ao obter matrículas: ${matriculasError.message}`);
    }

    const { data: municipios, error: municipiosError2 } = await supabase
      .from('Municipio')
      .select('id, nome')
      .in('id', municipioIds);

    if (municipiosError2) {
      throw new Error(`Erro ao obter municípios: ${municipiosError2.message}`);
    }

    const municipioMap = new Map(
      municipios?.map((municipio) => [municipio.id, municipio.nome]),
    );

    const result: RankingRepositoryOutput[] = idFiltro
      .map((idFiltro) => {
        return matriculas
          .filter((matricula) => matricula.id_filtro === idFiltro.id)
          .map((matricula) => ({
            ano: idFiltro.ano,
            raca: matricula.cor_raca,
            rede: matricula.dependencia_administrativa,
            etapa: idFiltro.etapa_de_ensino,
            matricula: matricula.quantidade,
            municipio: municipioMap.get(idFiltro.municipio_id) || 'Desconhecido',
          }));
      })
      .flat();

    return result;
  }
}
