import { describe, expect, test } from 'vitest';
import { disorderedData, rankingData } from '../database/memory/data/rankingMemoryData';
import { RankingRepositoryMemory } from '../database/memory/rankingRepositoryMemory';
import { RankingInput, RankingService } from './rankingServices';

describe('Ranking Service', () => {
  const rankingRepository = new RankingRepositoryMemory();
  const rankingService = new RankingService(rankingRepository);

  rankingRepository.DATA_IN_MEMORY = rankingData;

  const input: RankingInput = {
    ano: 2022,
    etapa: 'Ensino Médio',
    ordem: 'maior',
  };
  test('should return data with success', async () => {
    const output = await rankingService.execute(input);
    expect(output[0].name).toEqual('Vargem Bonita');
    expect(output[0].value).toEqual(10);
  });
  test('should return data lenght with succces', async () => {
    const output = await rankingService.execute(input);
    expect(output).toHaveLength(2);
  });
  test('should return data in another order with success', async () => {
    const output = await rankingService.execute({ ...input, ordem: 'menor' });
    expect(output[0].name).toEqual('Belo Horizonte');
    expect(output[0].value).toEqual(5.67);
  });
  test('should return data with another filter with success', async () => {
    const output = await rankingService.execute({
      ...input,
      etapa: 'Ensino Fundamental 1',
      ano: 2020,
    });
    expect(output[0].name).toEqual('Belo Horizonte');
    expect(output[0].value).toEqual(4);
    expect(output[1].name).toEqual('Patos de Minas');
    expect(output[1].value).toEqual(1);
  });
  test('should return disorderedData input with success', async () => {
    rankingRepository.DATA_IN_MEMORY = disorderedData;
    const output = await rankingService.execute({
      ...input,
      etapa: 'Ensino Fundamental 1',
      ano: 2021,
    });
    rankingRepository.DATA_IN_MEMORY = disorderedData;
    console.log(disorderedData);
    expect(output[0].name).toEqual('Belo Horizonte');
    expect(output[0].value).toEqual(4);
    expect(output[1].name).toEqual('Patos de Minas');
    expect(output[1].value).toEqual(1);
  });
  test('should return an Erro when not exists register with ano filter', async () => {
    const incorrectEtapaInput = { ...input, ano: 2024 };

    await expect(rankingService.execute(incorrectEtapaInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });
  test('should return an Error when not exists register with etapa filter', async () => {
    const incorrectEtapaInput = { ...input, etapa: 'Ensino' };

    await expect(rankingService.execute(incorrectEtapaInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });
  test('should return an Error when order filter is wrong', async () => {
    const incorrectMunicipioInput = { ...input, ordem: 'crescente' };
    rankingRepository.DATA_IN_MEMORY = rankingData;
    await expect(rankingService.execute(incorrectMunicipioInput)).rejects.toThrowError(
      'Ordem inválida.',
    );
  });
});
