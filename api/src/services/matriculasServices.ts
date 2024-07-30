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

    // Definindo os anos e redes esperados
    const anos = [2020, 2021, 2022, 2023];
    const redes = ['Pública', 'Privada'];

    // Criando combinações de ano e rede
    anos.forEach((ano) => {
      redes.forEach((rede) => {
        const category = `${ano} ${rede}`;
        categories.push(category);
        newData.pretos.push(0);
        newData.brancos.push(0);
      });
    });

    // Atualizando dados de matrículas
    data.forEach((entry) => {
      if (entry.etapa !== input.etapa || entry.municipio !== input.municipio) {
        throw new Error('Etapa ou municipio errados.');
      }
      const category = `${entry.ano} ${entry.rede}`;
      const index = categories.indexOf(category);

      if (entry.raca === 'Pretos') {
        newData.pretos[index] += entry.matricula;
      } else if (entry.raca === 'Brancos') {
        newData.brancos[index] += entry.matricula;
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
