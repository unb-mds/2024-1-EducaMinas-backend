import { Request, Response } from 'express';

export const IndicatorController = async (req: Request, res: Response) => {
  const { municipio, etapa, indicador, rede } = req.query;
  console.log(
    `Indicador Município: ${municipio} - Etapa: ${etapa} - Indicador: ${indicador} - Rede: ${rede}`,
  );

  const response = {
    categories: [2019, 2020, 2021, 2022, 2023],
    series: [
      {
        name: 'Brancos',
        data: [
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
        ],
      },
      {
        name: 'Pretos/Pardos',
        data: [
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
          Math.floor(Math.random() * 10001),
        ],
      },
    ],
  };
  res.json(response);
};
