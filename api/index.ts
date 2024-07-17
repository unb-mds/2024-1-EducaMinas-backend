// index.ts

import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

// Middleware para parser de JSON
app.use(express.json());

// Importa rotas
import apiRoutes from './src/routes';

// Usa as rotas
app.use('/api', apiRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Olá Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
