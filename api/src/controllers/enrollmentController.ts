import { Request, Response } from 'express';

export const EnrollmentControler = async (req: Request, res: Response) => {
  const { municipio, etapa } = req.query;
  res.json({ municipio, etapa });
};
