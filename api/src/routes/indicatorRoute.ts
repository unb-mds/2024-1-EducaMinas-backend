import { Router } from 'express';
import { IndicatorController } from '../controllers/indicatorController';

const router = Router();

router.get('/api/indicador', IndicatorController);

export default router;
