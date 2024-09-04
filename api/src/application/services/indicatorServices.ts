import { IndicatorRepository } from '../../adapters/repositories/indicatorRepository';

export type IndicatorInput = {
  indicador: string;
  etapa: string;
  municipio: string;
};

type Output = {
  categories: number[];
  series: {
    name: string;
    data: number[];
  }[];
};

export class IndicatorService {
  constructor(private indicatorRepository: IndicatorRepository) {}

  async execute(input: IndicatorInput): Promise<Output> {
    const data = await this.indicatorRepository.fetch(input);

    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }

    const newData: { [key: string]: number[] } = {
      Pública: [],
      Privada: [],
    };
    const categories: number[] = [];

    const anos = [2020, 2021, 2022, 2023];

    anos.forEach((ano) => {
      categories.push(ano);
      newData.Pública.push(0);
      newData.Privada.push(0);
    });

    data.forEach((entry: { [key: string]: any }) => {
      const index = categories.indexOf(entry.ano);

      if (entry.rede === 'Pública') {
        newData.Pública[index] += entry[input.indicador];
      } else if (entry.rede === 'Privada') {
        newData.Privada[index] += entry[input.indicador];
      }
    });

    const series = Object.entries(newData).map(([name, data]) => ({
      name,
      data: data.map((value: number) => parseFloat(value.toFixed(1))),
    }));
    return {
      series,
      categories,
    };
  }
}
