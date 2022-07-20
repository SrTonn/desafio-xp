import { Request, Response, Router } from 'express';
import { authValidation, investmentValidation } from '../middlewares';

import { buyAssets } from '../services/investment.service';

const investmentRouter = Router();

investmentRouter
  .post('/buy', authValidation, investmentValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await buyAssets(id, req.body);
    return res.status(201).json(response);
  });

export default investmentRouter;
