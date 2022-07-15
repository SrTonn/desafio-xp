/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
//  routers

//  ErrorMiddleware

app.listen(PORT, () => {
  console.log(`🔥 Server is running on PORT: ${PORT}`);
});
