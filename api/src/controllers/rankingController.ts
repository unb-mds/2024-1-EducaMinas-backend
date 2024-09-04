import { Request, Response } from 'express';
import { RankingRepositoryPSQL } from '../database/psql/rankingRepositoryPSQL';
import { RankingService } from '../services/rankingServices';

export const RankingController = async (req: Request, res: Response) => {
  try {
    const { ano, etapa } = req.query;

    if (typeof ano !== 'string' || typeof etapa !== 'string') {
      return res.status(400).json({ message: 'Ano, Etapa ou Ordem inválidos.' });
    }
    if (!ano || !etapa) {
      return res.status(400).json({ message: 'Ano, Etapa e Ordem são obrigatórios.' });
    }

    const service = new RankingService(new RankingRepositoryPSQL());
    const result = await service.execute({ ano: parseInt(ano), etapa });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(400).json({ message: (error as any).message });
  }
};
