import express from 'express';
import enrollmentRoute from './routes/enrollmentRoute';
import indicatorRoute from './routes/indicatorRoute';
import rankingRoute from './routes/rankingRoute';

const app = express();

app.use(enrollmentRoute, indicatorRoute, rankingRoute);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
