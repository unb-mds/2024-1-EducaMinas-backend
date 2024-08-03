import { Request, Response } from 'express';

export const IndicatorController = async (req: Request, res: Response) => {
  const { municipio, etapa, indicador, rede } = req.query;
  console.log(
    `Município: ${municipio} - Etapa: ${etapa} - Indicador: ${indicador} - Rede: ${rede}`,
  );

  const response = {
    categories: [2019, 2020, 2021, 2022, 2023],
    series: [
      {
        name: 'Brancos',
        data: [12, 34, 14, 29, 45],
      },
      {
        name: 'Pretos',
        data: [20, 22, 23, 19, 30],
      },
    ],
  };
  res.json(response);
};
