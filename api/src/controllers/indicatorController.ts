import { Request, Response } from 'express';

export const IndicatorController = async (req: Request, res: Response) => {
  const { municipio, etapa, indicador, rede } = req.query;

};
