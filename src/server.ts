/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import routers from './router';
import httpErrorMiddleware from './middlewares/error';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(routers);
app.use(httpErrorMiddleware);

app.listen(PORT, () => {
  console.log(`🔥 Server is running on PORT: ${PORT}`);
});
