import { Request, Response, Router } from 'express';
import { authValidation } from '../middlewares';

import { getBalance } from '../services/wallet.service';

const walletRouter = Router();

walletRouter.get('/balance', authValidation, async (_req: Request, res: Response) => {
  const { id } = res.locals.payload;
  const response = await getBalance(id);
  return res.status(200).json(response);
});

export default walletRouter;
