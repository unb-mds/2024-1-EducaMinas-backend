import { RankingRepository } from '../repositories/rankingRepository';

export type RankingInput = {
  ano: number;
  etapa: string;
  ordem: string;
};
type Output = {
  name: string; // Nome do município
  value: number; // Valor do índice calculado
}[]; // Será um vetor ordenado de acordo com a chave value e com a ordem recebida: maior ou menor
export class RankingService {
  constructor(private rankingRepository: RankingRepository) {}

  async execute(input: RankingInput): Promise<Output> {
    const data = await this.rankingRepository.fetch(input);
    if (!data || data.length === 0) {
      throw new Error('Nenhum dado foi encontrado para estes filtros.');
    }
    const newData: { [key: string]: number } = {};
    data.forEach((entry) => {
      if (entry.etapa !== input.etapa || entry.ano !== input.ano) {
        throw new Error('Etapa ou ano errados.');
      }
      if (!newData[entry.municipio]) {
        newData[entry.municipio] = (entry.reprovacao + entry.evasao + entry.atraso) / 3;
      } else {
        newData[entry.municipio] = parseFloat(
          Math.abs(
            newData[entry.municipio] -
              (entry.reprovacao + entry.evasao + entry.atraso) / 3,
          ).toFixed(2),
        );
      }
    });

    const response: Output = Object.keys(newData)
      .map((key) => ({
        name: key,
        value: newData[key],
      }))
      .sort((a, b) => {
        if (input.ordem === 'maior') {
          return a.value < b.value ? 1 : -1;
        } else if (input.ordem === 'menor') {
          return a.value > b.value ? 1 : -1;
        }
        throw new Error('Ordem inválida.');
      });
    return response;
  }
}
