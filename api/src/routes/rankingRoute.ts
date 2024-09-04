import { Router } from 'express';
import { RankingController } from '../controllers/rankingController';

const router = Router();
/**
 * @swagger
 * /api/ranking:
 *   get:
 *     summary: Busca ranking de municípios
 *     description: Retorna o ranking de municípios por ano, etapa e ordem.
 *     parameters:
 *       - in: query
 *         name: ano
 *         schema:
 *           type: string
 *         required: true
 *         description: Ano de referência
 *       - in: query
 *         name: etapa
 *         schema:
 *           type: string
 *         required: true
 *         description: Etapa de ensino
 *     responses:
 *       200:
 *         description: Ranking de municípios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   value:
 *                     type: number
 */

router.get('/api/ranking', RankingController);

export default router;
