import { describe, expect, test } from 'vitest';
import {
  disorderedData,
  genericData,
  incompleteData,
  perfectData,
} from '../database/memory/data/indicadoresMemoryData';
import { IndicadoresRepositoryMemory } from '../database/memory/indicadoresRepositoryMemory';
import { IndicadoresInput, IndicadoresService } from './indicadoresServices';

describe('Indicadores Service', () => {
  const indicadoresRepository = new IndicadoresRepositoryMemory();
  const indicadoresService = new IndicadoresService(indicadoresRepository);

  indicadoresRepository.DATA_IN_MEMORY = genericData;

  const input: IndicadoresInput = {
    indicador: 'Reprovação',
    etapa: 'Ensino Médio',
    rede: 'Pública',
    municipio: 'Patos de Minas',
  };

  test('should return categories length with success', async () => {
    const output = await indicadoresService.execute(input);
    expect(output.categories).toHaveLength(2);
  });

  test('should return first category with success', async () => {
    const output = await indicadoresService.execute(input);
    expect(output.categories[0]).toEqual(2019);
  });

  test('should return second categorie with success', async () => {
    const output = await indicadoresService.execute(input);
    expect(output.categories[1]).toEqual(2020);
  });

  test('should return series length with success', async () => {
    const output = await indicadoresService.execute(input);
    expect(output.series).toHaveLength(2);
  });

  test('should return first series with success', async () => {
    const output = await indicadoresService.execute(input);
    expect(output.series[0].name).toEqual('pretos');
    expect(output.series[0].data).toHaveLength(2);
    expect(output.series[0].data[0]).toEqual(33);
    expect(output.series[0].data[1]).toEqual(36);
  });

  test('should return second series with success', async () => {
    const output = await indicadoresService.execute(input);
    expect(output.series[1].name).toEqual('brancos');
    expect(output.series[1].data).toHaveLength(2);
    expect(output.series[1].data[0]).toEqual(10);
    expect(output.series[1].data[1]).toEqual(11);
  });

  test('should return output with other city with success', async () => {
    const otherCityInput: IndicadoresInput = {
      indicador: 'Reprovação',
      etapa: 'Ensino Médio',
      rede: 'Pública',
      municipio: 'Tiros',
    };

    indicadoresRepository.DATA_IN_MEMORY = [
      ...genericData,
      {
        ano: 2020,
        indicador: 'Reprovação',
        valor: 5,
        municipio: 'Tiros',
        raca: 'Pretos',
        rede: 'Pública',
        etapa: 'Ensino Médio',
      },
    ];
    const output = await indicadoresService.execute(otherCityInput);
    expect(output.categories).toHaveLength(1);
    expect(output.categories[0]).toEqual(2020);
    expect(output.series[0].name).toEqual('pretos');
    expect(output.series[0].data).toHaveLength(1);
    expect(output.series[0].data[0]).toEqual(5);
  });

  test('should return an Error when not exists register with indicador filter', async () => {
    const incorrectIndicadorInput = { ...input, indicador: 'Taxa Inexistente' };

    await expect(indicadoresService.execute(incorrectIndicadorInput)).rejects.toThrow(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });

  test('should return data in order', async () => {
    indicadoresRepository.DATA_IN_MEMORY = disorderedData;

    const response = await indicadoresService.execute({
      indicador: 'Reprovação',
      etapa: 'Ensino Médio',
      rede: 'Pública',
      municipio: 'Patos de Minas',
    });

    expect(response.series[0].name).toEqual('pretos');
    expect(response.series[0].data).toEqual([50, 22]);
    expect(response.series[1].name).toEqual('brancos');
    expect(response.series[1].data).toEqual([33, 44]);
    expect(response.categories).toEqual([2019, 2020]);
  });

  test('should return completed data', async () => {
    indicadoresRepository.DATA_IN_MEMORY = incompleteData;

    const response = await indicadoresService.execute({
      ...input,
      municipio: 'Patos de Minas',
    });

    expect(response.series[0].name).toEqual('pretos');
    expect(response.series[0].data).toEqual([26, 0]);
    expect(response.series[1].name).toEqual('brancos');
    expect(response.series[1].data).toEqual([0, 39]);
    expect(response.categories).toEqual([2019, 2020]);
  });

  test('should return all data correct', async () => {
    indicadoresRepository.DATA_IN_MEMORY = perfectData;
    const response = await indicadoresService.execute({
      ...input,
      municipio: 'Patos de Minas',
    });
    expect(response.series[0].name).toEqual('pretos');
    expect(response.series[0].data).toEqual([26, 22, 35]);
    expect(response.series[1].name).toEqual('brancos');
    expect(response.series[1].data).toEqual([39, 44, 40]);
    expect(response.categories).toEqual([2019, 2020, 2021]);
  });
});
