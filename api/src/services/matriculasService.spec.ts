import { describe, expect, test } from 'vitest';
import { MatriculasRepositoryMemory } from '../database/memory/matriculasRepositoryMemory';
import { MatriculasInput, MatriculasService } from './matriculasServices';

describe('Matriculas Service', () => {
  const matriculaRepository = new MatriculasRepositoryMemory();
  const matriculasService = new MatriculasService(matriculaRepository);

  matriculaRepository.DATA_IN_MEMORY = [
    {
      ano: 2020,
      etapa: 'Ensino Fundamental 1',
      matricula: 23,
      municipio: 'Patos de Minas',
      raca: 'Brancos',
      rede: 'Pública',
    },
    {
      ano: 2020,
      etapa: 'Ensino Médio',
      matricula: 45,
      municipio: 'Uberaba',
      raca: 'Brancos',
      rede: 'Privada',
    },
    {
      ano: 2020,
      etapa: 'Ensino Médio',
      matricula: 12,
      municipio: 'Patos de Minas',
      raca: 'Brancos',
      rede: 'Pública',
    },
    {
      ano: 2020,
      etapa: 'Ensino Médio',
      matricula: 15,
      municipio: 'Patos de Minas',
      raca: 'Brancos',
      rede: 'Privada',
    },
    {
      ano: 2020,
      etapa: 'Ensino Médio',
      matricula: 30,
      municipio: 'Patos de Minas',
      raca: 'Pretos',
      rede: 'Pública',
    },
    {
      ano: 2020,
      etapa: 'Ensino Médio',
      matricula: 3,
      municipio: 'Patos de Minas',
      raca: 'Pretos',
      rede: 'Privada',
    },
  ];

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
    expect(output.series[0].data).toHaveLength(0);
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
    expect(output.series[0].data).toHaveLength(0);
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
});
