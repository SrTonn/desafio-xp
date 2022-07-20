import { Request, Response, Router } from 'express';
import { authValidation } from '../middlewares';

import { getAssets } from '../services/assets.service';

const assetsRouter = Router();

assetsRouter
  .get('/', authValidation, async (_req: Request, res: Response) => {
    const response = await getAssets();
    return res.status(200).json(response);
  });

assetsRouter
  .get('/:stockCode', authValidation, async (req: Request, res: Response) => {
    const { stockCode } = req.params;
    const response = await getAssets(stockCode);
    return res.status(201).json(response);
  });

export default assetsRouter;
