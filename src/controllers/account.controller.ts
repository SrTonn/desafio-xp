import { Request, Response, Router } from 'express';
import { userLoginValidation } from '../middlewares';

import { authentication } from '../services/account.service';

const accountRouter = Router();

accountRouter.post('/login', userLoginValidation, async (req: Request, res: Response) => {
  const { token } = await authentication(req.body);
  return res.status(200).json(token);
});

export default accountRouter;
