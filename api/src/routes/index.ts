// src/routes/index.ts

import { Router } from 'express';

const router = Router();

// Defina suas rotas aqui
router.get('/hello', (req, res) => {
  res.send('Olá Mundo!');
});

export default router;
