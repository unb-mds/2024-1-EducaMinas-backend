import { Request, Response } from 'express';
import { EnrollmentService } from '../../application/services/enrollmentServices';
import { EnrollmentRepositoryPSQL } from '../../infrastructure/database/psql/enrollmentRepositoryPSQL';

export const EnrollmentController = async (req: Request, res: Response) => {
  try {
    const { municipio, etapa } = req.query;

    if (typeof municipio !== 'string' || typeof etapa !== 'string') {
      return res.status(400).json({ message: 'Município ou Etapa inválidos.' });
    }
    if (!municipio || !etapa) {
      return res.status(400).json({ message: 'Municipio e Etapa são obrigatórios.' });
    }

    const service = new EnrollmentService(new EnrollmentRepositoryPSQL());
    const result = await service.execute({ municipio, etapa });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(400).json({ message: (error as any).message });
  }
};
