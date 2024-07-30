import { describe, expect, test } from 'vitest';
import {
  disorderedData,
  genericData,
  incompleteData,
  perfectData,
} from '../database/memory/data/matriculasMemoryData';
import { MatriculasRepositoryMemory } from '../database/memory/matriculasRepositoryMemory';
import { MatriculasInput, MatriculasService } from './matriculasServices';

describe('Matriculas Service', () => {
  const matriculaRepository = new MatriculasRepositoryMemory();
  const matriculasService = new MatriculasService(matriculaRepository);

  matriculaRepository.DATA_IN_MEMORY = genericData;

  const input: MatriculasInput = {
    etapa: 'Ensino Médio',
    municipio: 'Patos de Minas',
  };

  test('should return categories length with success', async () => {
    const output = await matriculasService.execute(input);
    expect(output.categories).toHaveLength(2);
  });

  test('should return first categorie with success', async () => {
    const output = await matriculasService.execute(input);
    expect(output.categories[0]).toEqual('2020 Pública');
  });

  test('should return second categorie with success', async () => {
    const output = await matriculasService.execute(input);
    expect(output.categories[1]).toEqual('2020 Privada');
  });

  test('should return series length with success', async () => {
    const output = await matriculasService.execute(input);
    expect(output.series).toHaveLength(2);
  });

  test('should return first series with success', async () => {
    const output = await matriculasService.execute(input);
    expect(output.series[0].name).toEqual('pretos');
    expect(output.series[0].data).toHaveLength(2);
    expect(output.series[0].data[0]).toEqual(30);
    expect(output.series[0].data[1]).toEqual(3);
  });

  test('should return second series with success', async () => {
    const output = await matriculasService.execute(input);
    expect(output.series[1].name).toEqual('brancos');
    expect(output.series[1].data).toHaveLength(2);
    expect(output.series[1].data[0]).toEqual(12);
    expect(output.series[1].data[1]).toEqual(15);
  });

  test('should return output with other city with success', async () => {
    const output = await matriculasService.execute({
      ...input,
      municipio: 'Uberaba',
    });
    expect(output.categories).toHaveLength(1);
    expect(output.categories[0]).toEqual('2020 Privada');
    expect(output.series[0].name).toEqual('pretos');
    expect(output.series[0].data).toHaveLength(1);
    expect(output.series[1].name).toEqual('brancos');
    expect(output.series[1].data).toHaveLength(1);
    expect(output.series[1].data[0]).toEqual(45);
  });

  test('should return output with other etapa with success', async () => {
    const output = await matriculasService.execute({
      ...input,
      etapa: 'Ensino Fundamental 1',
    });
    expect(output.categories).toHaveLength(1);
    expect(output.categories[0]).toEqual('2020 Pública');
    expect(output.series[0].name).toEqual('pretos');
    expect(output.series[0].data).toHaveLength(1);
    expect(output.series[1].name).toEqual('brancos');
    expect(output.series[1].data).toHaveLength(1);
    expect(output.series[1].data[0]).toEqual(23);
  });

  test('should return an Error when not exists register with etapa filter', async () => {
    const incorrectEtapaInput = { ...input, etapa: 'Ensino' };

    await expect(matriculasService.execute(incorrectEtapaInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });

  test('should return an Error when not exists register with municipio filter', async () => {
    const incorrectMunicipioInput = { ...input, municipio: 'BH' };

    await expect(matriculasService.execute(incorrectMunicipioInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });
  test('should return data in order', async () => {
    matriculaRepository.DATA_IN_MEMORY = disorderedData;
    const response = await matriculasService.execute({
      ...input,
      municipio: 'Belo Horizonte',
    });
    expect(response.series[0].name).toEqual('pretos');
    expect(response.series[0].data).toEqual([40, 28, 25, 18]);
    expect(response.series[1].name).toEqual('brancos');
    expect(response.series[1].data).toEqual([30, 22, 35, 45]);
    expect(response.categories).toEqual([
      '2021 Pública',
      '2021 Privada',
      '2022 Pública',
      '2022 Privada',
    ]);
  });
  test('should return completed data', async () => {
    matriculaRepository.DATA_IN_MEMORY = incompleteData;
    const response = await matriculasService.execute({
      ...input,
      municipio: 'Belo Horizonte',
    });
    expect(response.series[0].name).toEqual('pretos');
    expect(response.series[0].data).toEqual([25, 0]);
    expect(response.series[1].name).toEqual('brancos');
    expect(response.series[1].data).toEqual([35, 45]);
    expect(response.categories).toEqual(['2022 Pública', '2022 Privada']);
  });
  test('should return all data correct', async () => {
    matriculaRepository.DATA_IN_MEMORY = perfectData;
    const response = await matriculasService.execute({
      ...input,
      municipio: 'Belo Horizonte',
    });
    expect(response.series[0].name).toEqual('pretos');
    expect(response.series[0].data).toEqual([7, 14, 21, 28, 35, 42, 49, 56]);
    expect(response.series[1].name).toEqual('brancos');
    expect(response.series[1].data).toEqual([10, 20, 30, 40, 50, 60, 70, 80]);
    expect(response.categories).toEqual([
      '2020 Pública',
      '2020 Privada',
      '2021 Pública',
      '2021 Privada',
      '2022 Pública',
      '2022 Privada',
      '2023 Pública',
      '2023 Privada',
    ]);
  });
});
