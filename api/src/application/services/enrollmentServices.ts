import { EnrollmentRepository } from '../../adapters/repositories/enrollmentRepository';

export type EnrollmentInput = {
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

export class EnrollmentService {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(input: EnrollmentInput): Promise<Output> {
    const data = await this.enrollmentRepository.fetch(input);

    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }

    const newData: { [key: string]: number[] } = {
      'Pretos/Pardos': [],
      Brancos: [],
    };
    const categories: string[] = [];

    const anos = [2020, 2021, 2022, 2023];
    const redes = ['Pública', 'Privada'];

    anos.forEach((ano) => {
      redes.forEach((rede) => {
        const category = `${ano} ${rede}`;
        categories.push(category);
        newData['Pretos/Pardos'].push(0);
        newData.Brancos.push(0);
      });
    });

    data.forEach((entry) => {
      if (
        entry.rede === 'Municipal' ||
        entry.rede === 'Estadual' ||
        entry.rede === 'Federal'
      ) {
        entry.rede = 'Pública';
      }
      const category = `${entry.ano} ${entry.rede}`;
      const index = categories.indexOf(category);

      if (entry.raca === 'Preta' || entry.raca === 'Parda') {
        newData['Pretos/Pardos'][index] += entry.matricula;
      } else if (entry.raca === 'Branca') {
        newData.Brancos[index] += entry.matricula;
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
