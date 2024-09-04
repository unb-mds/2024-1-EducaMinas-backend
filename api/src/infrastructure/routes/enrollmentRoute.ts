import { Router } from 'express';
import { EnrollmentController } from '../../adapters/controllers/enrollmentController';

const router = Router();

/**
 * @swagger
 * /api/matriculas:
 *   get:
 *     summary: Retorna dados de matrículas
 *     description: Retorna dados de matrículas por município e etapa
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
 *         description: Etapa da educação
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 */

router.get('/api/matriculas', EnrollmentController);

export default router;
