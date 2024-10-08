import { beforeEach, describe, expect, test } from 'vitest';
import { genericData } from '../../infrastructure/database/memory/data/rankingMemoryData';
import { RankingRepositoryMemory } from '../../infrastructure/database/memory/rankingRepositoryMemory';
import { RankingInput, RankingService } from './rankingServices';

describe('Ranking Service', () => {
  let rankingRepository: RankingRepositoryMemory;
  let rankingService: RankingService;

  beforeEach(() => {
    rankingRepository = new RankingRepositoryMemory();
    rankingService = new RankingService(rankingRepository);
    rankingRepository.DATA_IN_MEMORY = genericData;
  });

  const input: RankingInput = {
    ano: 2020,
    etapa: 'EF1',
  };

  test('should return data with success', async () => {
    const output = await rankingService.execute(input);
    expect(output[0].name).toEqual('Abaeté');
    expect(output[0].value).toEqual(36.25);
  });

  test('should return data length with success', async () => {
    const output = await rankingService.execute(input);
    expect(output).toHaveLength(3);
  });

  test('should return an Error when no register exists with ano filter', async () => {
    const incorrectAnoInput = { ...input, ano: 2024 };

    await expect(rankingService.execute(incorrectAnoInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });

  test('should return an Error when no register exists with etapa filter', async () => {
    const incorrectEtapaInput = { ...input, etapa: 'Ensino' };

    await expect(rankingService.execute(incorrectEtapaInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });
});
