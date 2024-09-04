import { IndicadoresRepository } from '../repositories/indicadoresRepository';

export type IndicadoresInput = {
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

export class IndicadoresService {
  constructor(private indicadoresRepository: IndicadoresRepository) {}

  async execute(input: IndicadoresInput): Promise<Output> {
    const data = await this.indicadoresRepository.fetch(input);

    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }

    const newData: { [key: string]: number[] } = {
      Pública: [],
      Privada: [],
    };
    const categories: number[] = [];

    // Definindo os anos esperados
    const anos = [2020, 2021, 2022, 2023];

    // Criando combinações de ano
    anos.forEach((ano) => {
      categories.push(ano);
      newData.Pública.push(0);
      newData.Privada.push(0);
    });

    // Atualizando dados de indicadores
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
