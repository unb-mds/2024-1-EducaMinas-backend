import { Request, Response } from 'express';

export const IndicatorController = async (req: Request, res: Response) => {
  const { municipio, etapa, indicador, rede } = req.query;
  console.log(
    `Município: ${municipio} - Etapa: ${etapa} - Indicador: ${indicador} - Rede: ${rede}`,
  );
  res.json({ municipio, etapa, indicador, rede });
};
