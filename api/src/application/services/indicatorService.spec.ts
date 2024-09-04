import { describe, expect, test } from 'vitest';
import { genericData } from '../../infrastructure/database/memory/data/indicatorMemoryData';
import { IndicatorRepositoryMemory } from '../../infrastructure/database/memory/indicatorRepositoryMemory';
import { IndicatorInput, IndicatorService } from './indicatorServices';

describe('Indicator Service', () => {
  const indicatorRepository = new IndicatorRepositoryMemory();
  const indicatorService = new IndicatorService(indicatorRepository);

  indicatorRepository.DATA_IN_MEMORY = genericData.map((item) => ({
    ...item,
    municipio: item.municipio.toString(),
  }));

  const input: IndicatorInput = {
    indicador: 'taxa_de_aprovacao',
    etapa: 'EF2',
    municipio: '3101102',
  };

  test('should return categories length with success', async () => {
    const output = await indicatorService.execute(input);
    expect(output.categories).toHaveLength(4);
  });

  test('should return first category with success', async () => {
    const output = await indicatorService.execute(input);
    expect(output.categories[0]).toEqual(2020);
  });

  test('should return last categorie with success', async () => {
    const output = await indicatorService.execute(input);
    expect(output.categories[3]).toEqual(2023);
  });

  test('should return series length with success', async () => {
    const output = await indicatorService.execute(input);
    expect(output.series).toHaveLength(2);
  });

  test('should return first series with success', async () => {
    const output = await indicatorService.execute(input);
    expect(output.series[0].name).toEqual('Pública');
    expect(output.series[0].data).toHaveLength(4);
    expect(output.series[0].data[0]).toEqual(97.9);
    expect(output.series[0].data[1]).toEqual(97.3);
  });

  test('should return second series with success', async () => {
    const output = await indicatorService.execute(input);
    expect(output.series[1].name).toEqual('Privada');
    expect(output.series[1].data).toHaveLength(4);
    expect(output.series[1].data[0]).toEqual(100);
    expect(output.series[1].data[1]).toEqual(99);
  });

  test('should return an Error when not exists data with municipio filter', async () => {
    const incorrectIndicadorInput = {
      ...input,
      municipio: 'Onde Judas perdeu as botas',
    };

    await expect(indicatorService.execute(incorrectIndicadorInput)).rejects.toThrow(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });
});
