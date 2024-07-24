import { Router } from 'express';
import { RankingController } from '../controllers/rankingController';

const router = Router();

router.get('/api/ranking', RankingController);

export default router;
