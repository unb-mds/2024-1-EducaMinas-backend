import { Router } from 'express';
import { IndicatorController } from '../controllers/indicatorController';

const router = Router();

/**
 * @swagger
 * /api/indicador:
 *   get:
 *     summary: Busca dados de indicadores
 *     description: Retorna dados de indicadores por município, etapa, indicador e rede.
 *     parameters:
 *       - in: query
 *         name: municipio
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do município
 *       - in: query
 *         name: etapa
 *         schema:
 *           type: string
 *         required: true
 *         description: Etapa de ensino
 *       - in: query
 *         name: indicador
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do indicador
 *       - in: query
 *         name: rede
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de rede (pública/privada)
 *     responses:
 *       200:
 *         description: Dados de indicadores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: number
 *                 series:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       data:
 *                         type: array
 *                         items:
 *                           type: number
 */

router.get('/api/indicador', IndicatorController);

export default router;
