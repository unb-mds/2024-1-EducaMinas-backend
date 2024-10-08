import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import enrollmentRoute from './infrastructure/routes/enrollmentRoute';
import indicatorRoute from './infrastructure/routes/indicatorRoute';
import rankingRoute from './infrastructure/routes/rankingRoute';
import { options } from './swaggerConfig';

config();

const app = express();
const swaggerSpec = swaggerJsdoc(options);
app.use(
  cors({
    origin: '*',
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.json(
    'Bem vindo à API pública do EducaMinas! Acesse /api/matriculas, /api/indicador ou /api/ranking para obter os dados.',
  );
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(enrollmentRoute, indicatorRoute, rankingRoute);

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
