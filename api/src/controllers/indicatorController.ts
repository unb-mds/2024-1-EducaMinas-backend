import { Request, Response } from 'express';
import { IndicadoresRepositoryPSQL } from '../database/psql/indicadoresRepositoryPSQL';
import { IndicadoresService } from '../services/indicadoresServices';

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

    const service = new IndicadoresService(new IndicadoresRepositoryPSQL());
    const result = await service.execute({ indicador, etapa, municipio });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(400).json({ message: (error as any).message });
  }
};
