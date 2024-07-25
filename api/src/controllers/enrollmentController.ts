import { Request, Response } from 'express';

export const EnrollmentControler = async (req: Request, res: Response) => {
  const { municipio, etapa } = req.query;
  console.log(`Município: ${municipio} - Etapa: ${etapa}`);
  res.json({ municipio, etapa });
};
