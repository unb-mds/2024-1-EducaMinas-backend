import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import enrollmentRoute from './routes/enrollmentRoute';
import indicatorRoute from './routes/indicatorRoute';
import rankingRoute from './routes/rankingRoute';
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
  res.json('Bem vindo!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(enrollmentRoute, indicatorRoute, rankingRoute);

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
