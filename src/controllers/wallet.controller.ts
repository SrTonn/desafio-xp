import { Request, Response, Router } from 'express';
import { authValidation, walletValidation } from '../middlewares';

import { getBalance, deposit, withdraw, history } from '../services/wallet.service';

const walletRouter = Router();

walletRouter.get('/balance', authValidation, async (_req: Request, res: Response) => {
  const { id } = res.locals.payload;
  const response = await getBalance(id);
  return res.status(200).json(response);
});

walletRouter
  .post('/deposit', authValidation, walletValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await deposit(id, req.body);
    return res.status(201).json(response);
  });

walletRouter
  .post('/withdraw', authValidation, walletValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await withdraw(id, req.body);
    return res.status(201).json(response);
  });

walletRouter
  .get('/history', authValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await history(id);
    return res.status(200).json(response);
  });

export default walletRouter;
