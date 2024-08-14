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
      if (entry.etapa !== input.etapa || entry.municipio.toString() !== input.municipio) {
        throw new Error('entry.etapa');
      }

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

    // REMOVE CATEGORIAS VAZIAS
    // for (let i = categories.length - 1; i >= 0; i--) {
    //   if (newData['Pretos/Pardos'][i] <= 0 && newData.Brancos[i] <= 0) {
    //     newData['Pretos/Pardos'].splice(i, 1);
    //     newData.Brancos.splice(i, 1);
    //     categories.splice(i, 1);
    //   }
    // }

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
