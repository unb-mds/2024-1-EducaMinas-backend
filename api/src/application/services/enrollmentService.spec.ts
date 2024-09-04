import { describe, expect, test } from 'vitest';
import { genericData } from '../../infrastructure/database/memory/data/enrollmentMemoryData';
import { EnrollmentRepositoryMemory } from '../../infrastructure/database/memory/enrollmentRepositoryMemory';
import { EnrollmentInput, EnrollmentService } from './enrollmentServices';

describe('Enrollment Service', () => {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const enrollmentService = new EnrollmentService(enrollmentRepository);

  enrollmentRepository.DATA_IN_MEMORY = genericData.map((item) => ({
    ...item,
    municipio: item.municipio.toString(),
  }));

  const input: EnrollmentInput = {
    etapa: 'EM',
    municipio: '3106200',
  };

  test('should return categories length with success', async () => {
    const output = await enrollmentService.execute(input);
    expect(output.categories).toHaveLength(8);
  });

  test('should return first categorie with success', async () => {
    const output = await enrollmentService.execute(input);
    expect(output.categories[0]).toEqual('2020 Pública');
  });

  test('should return second categorie with success', async () => {
    const output = await enrollmentService.execute(input);
    expect(output.categories[1]).toEqual('2020 Privada');
  });

  test('should return series length with success', async () => {
    const output = await enrollmentService.execute(input);
    expect(output.series).toHaveLength(2);
  });

  test('should return an Error when not exists register with etapa filter', async () => {
    const incorrectEtapaInput = { ...input, etapa: 'Ensino' };

    await expect(enrollmentService.execute(incorrectEtapaInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });

  test('should return an Error when not exists register with municipio filter', async () => {
    const incorrectMunicipioInput = { ...input, municipio: 'BH' };

    await expect(enrollmentService.execute(incorrectMunicipioInput)).rejects.toThrowError(
      'Nenhum dado foi encontrado para estes filtros.',
    );
  });
  test('should return data in order', async () => {
    enrollmentRepository.DATA_IN_MEMORY = genericData.map((item) => ({
      ...item,
      municipio: item.municipio.toString(),
    }));
    const response = await enrollmentService.execute(input);
    expect(response.series[0].name).toEqual('Pretos/Pardos');
    expect(response.series[0].data).toEqual([0, 0, 0, 0, 85, 21, 100, 28]);
    expect(response.series[1].name).toEqual('Brancos');
    expect(response.series[1].data).toEqual([0, 0, 0, 0, 50, 40, 60, 80]);
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
