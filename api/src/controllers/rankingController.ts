import { Request, Response } from 'express';

export const RankingController = async (req: Request, res: Response) => {
  const { ano, etapa, ordem } = req.query;

};

