import { Request, Response } from 'express';

export const EnrollmentController = async (req: Request, res: Response) => {
  const { municipio, etapa } = req.query;
  console.log(` Matriculas: Município: ${municipio} - Etapa: ${etapa}`);
  const response = {
    series: [
      { name: 'pretos', data: [7, 1, 21, 28, 3, 420, 12, 56] },
      { name: 'brancos', data: [10, 20, 500, 40, 50, 60, 70, 100] },
    ],
    categories: [
      '2020 Pública',
      '2020 Privada',
      '2021 Pública',
      '2021 Privada',
      '2022 Pública',
      '2022 Privada',
      '2023 Pública',
      '2023 Privada',
    ],
  };

  res.json(response);
};
