import { RankingRepository } from '../repositories/rankingRepository';

export type RankingInput = {
  ano: number;
  etapa: string;
};

type Output = {
  name: string; // Nome do município
  value: number; // Módulo da diferença percentual entre rede pública e privada
}[];

export class RankingService {
  constructor(private rankingRepository: RankingRepository) {}

  async execute(input: RankingInput): Promise<Output> {
    const data = await this.rankingRepository.fetch(input);
    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }

    const newData: {
      [key: string]: {
        pretoPublica: number;
        pretoPrivada: number;
        brancoPublica: number;
        brancoPrivada: number;
      };
    } = {};

    data.forEach((entry) => {
      if (entry.municipio === 'Todos') {
        entry.municipio = 'Minas Gerais';
      }
      const isPublica = ['Municipal', 'Estadual', 'Federal'].includes(entry.rede);
      const isPretosPardos = ['Preta', 'Parda'].includes(entry.raca);

      if (!newData[entry.municipio]) {
        newData[entry.municipio] = {
          pretoPublica: 0,
          pretoPrivada: 0,
          brancoPublica: 0,
          brancoPrivada: 0,
        };
      }

      if (isPublica) {
        if (isPretosPardos) {
          newData[entry.municipio].pretoPublica += entry.matricula;
        } else if (entry.raca === 'Branca') {
          newData[entry.municipio].brancoPublica += entry.matricula;
        }
      } else if (entry.rede === 'Privada') {
        if (isPretosPardos) {
          newData[entry.municipio].pretoPrivada += entry.matricula;
        } else if (entry.raca === 'Branca') {
          newData[entry.municipio].brancoPrivada += entry.matricula;
        }
      }
    });

    const response: Output = Object.keys(newData)
      .map((municipio) => {
        const totalPublica =
          newData[municipio].pretoPublica + newData[municipio].brancoPublica;
        const totalPrivada =
          newData[municipio].pretoPrivada + newData[municipio].brancoPrivada;

        // Exclui o município se qualquer um dos valores totais for inferior a 10
        if (totalPublica < 10 || totalPrivada < 10) {
          delete newData[municipio];
          return null;
        }

        const porcentagemPretosPublica =
          (newData[municipio].pretoPublica / totalPublica) * 100;
        const porcentagemPretosPrivada =
          (newData[municipio].pretoPrivada / totalPrivada) * 100;

        const diferencaPorcentagem = Math.abs(
          porcentagemPretosPublica - porcentagemPretosPrivada,
        );
        return {
          name: municipio,
          value: parseFloat(diferencaPorcentagem.toFixed(2)),
        };
      })
      .filter((item) => item !== null); // Filtra os municípios que foram excluídos

    return response;
  }
}
