import { Request, Response } from 'express';
import { IndicatorService } from '../../application/services/indicatorServices';
import { IndicatorRepositoryPSQL } from '../../infrastructure/database/psql/indicatorRepositoryPSQL';

export const IndicatorController = async (req: Request, res: Response) => {
  try {
    const { indicador, etapa, municipio } = req.query;

    if (
      typeof indicador !== 'string' ||
      typeof etapa !== 'string' ||
      typeof municipio !== 'string'
    ) {
      return res
        .status(400)
        .json({ message: 'Indicador, Etapa ou Município inválidos.' });
    }
    if (!indicador || !etapa || !municipio) {
      return res
        .status(400)
        .json({ message: 'Indicador, Etapa e Município são obrigatórios.' });
    }

    const service = new IndicatorService(new IndicatorRepositoryPSQL());
    const result = await service.execute({ indicador, etapa, municipio });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(400).json({ message: (error as any).message });
  }
};
