import { Router } from 'express';
import { EnrollmentControler } from '../controllers/enrollmentController';

const router = Router();

router.get('/api/matriculas', EnrollmentControler);

export default router;
