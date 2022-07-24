import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import routers from './router';
import httpErrorMiddleware from './middlewares/error';

const app = express();

app.use(express.json());
app.use(routers);
app.use(httpErrorMiddleware);

export = app;
