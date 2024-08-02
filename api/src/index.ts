import { createClient } from '@supabase/supabase-js';
import express from 'express';
import { config } from 'dotenv';
import enrollmentRoute from './routes/enrollmentRoute';
import indicatorRoute from './routes/indicatorRoute';
import rankingRoute from './routes/rankingRoute';

config();

const app = express();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(enrollmentRoute, indicatorRoute, rankingRoute);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
