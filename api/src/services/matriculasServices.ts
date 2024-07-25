import { MatriculasRepository } from '../repositories/matriculasRepository';

export type MatriculasInput = {
  municipio: string;
  etapa: string;
};

type Output = {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
};

export class MatriculasService {
  constructor(private matriculasRepository: MatriculasRepository) {}

  async execute(input: MatriculasInput): Promise<Output> {
    const data = await this.matriculasRepository.fetch(input);

    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }

    const newData: { [key: string]: number[] } = {
      pretos: [],
      brancos: [],
    };
    const categories: string[] = [];

    data.forEach((entry) => {
      const category = `${entry.ano} ${entry.rede}`;
      if (!categories.includes(category)) {
        categories.push(category);
      }

      if (entry.raca === 'Pretos') {
        newData.pretos.push(entry.matricula);
      } else if (entry.raca === 'Brancos') {
        newData.brancos.push(entry.matricula);
      }
    });

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
