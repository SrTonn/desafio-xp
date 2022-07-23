import { Request, Response, Router } from 'express';
import { authValidation, investmentSellValidation, investmentBuyValidation } from '../middlewares';

import { buyAssets, sellAssets } from '../services/investment.service';

const investmentRouter = Router();

investmentRouter
  .post('/buy', authValidation, investmentBuyValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await buyAssets(id, req.body);
    return res.status(201).json(response);
  });

investmentRouter
  .post('/sell', authValidation, investmentSellValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await sellAssets(id, req.body);
    return res.status(201).json(response);
  });

export default investmentRouter;
