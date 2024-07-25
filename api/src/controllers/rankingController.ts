import { Request, Response } from 'express';

export const RankingController = async (req: Request, res: Response) => {
  const { ano, etapa, ordem } = req.query;
  console.log(`Ano: ${ano} - Etapa: ${etapa} - Ordem: ${ordem}`);
  res.json({ ano, etapa, ordem });
};
