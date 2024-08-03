import { Request, Response } from 'express';

export const EnrollmentController = async (req: Request, res: Response) => {
  const { municipio, etapa } = req.query;
  console.log(`Município: ${municipio} - Etapa: ${etapa}`);
  const response = {
    series: [
      { name: 'pretos', data: [7, 14, 21, 28, 35, 42, 49, 56] },
      { name: 'brancos', data: [10, 20, 30, 40, 50, 60, 70, 80] },
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
