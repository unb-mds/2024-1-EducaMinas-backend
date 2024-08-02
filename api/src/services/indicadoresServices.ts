import { IndicadoresRepository } from '../repositories/indicadoresRepository';

export type IndicadoresInput = {
  indicador: string;
  etapa: string;
  rede: string;
  municipio: string;
};

type Output = {
  categories: number[];
  series: {
    name: string;
    data: number[];
  }[];
};

export class IndicadoresService {
  getIndicadores(filters: IndicadoresInput) {
    throw new Error('Method not implemented.');
  }
  constructor(private indicadoresRepository: IndicadoresRepository) {}

  async execute(input: IndicadoresInput): Promise<Output> {
    const data = await this.indicadoresRepository.fetch(input);

    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }

    const newData: { [key: string]: number[] } = {
      pretos: [],
      brancos: [],
    };
    const categories: number[] = [];

    // Definindo os anos esperados
    const anos = [2019, 2020, 2021, 2022];

    // Criando combinações de ano
    anos.forEach((ano) => {
      categories.push(ano);
      newData.pretos.push(0);
      newData.brancos.push(0);
    });

    // Atualizando dados de indicadores
    data.forEach((entry) => {
      if (
        entry.indicador !== input.indicador ||
        entry.etapa !== input.etapa ||
        entry.rede !== input.rede ||
        entry.municipio !== input.municipio
      ) {
        throw new Error('Indicador, etapa, rede ou municipio errados.');
      }
      const index = categories.indexOf(entry.ano);

      if (entry.raca === 'Pretos') {
        newData.pretos[index] += entry.valor;
      } else if (entry.raca === 'Brancos') {
        newData.brancos[index] += entry.valor;
      }
    });
    for (let i = categories.length - 1; i >= 0; i--) {
      if (newData.pretos[i] === 0 && newData.brancos[i] === 0) {
        newData.pretos.splice(i, 1);
        newData.brancos.splice(i, 1);
        categories.splice(i, 1);
      }
    }

    const series = Object.entries(newData).map(([name, data]) => ({
      name,
      data,
    }));

    return {
      series,
      categories,
    };
  }
}