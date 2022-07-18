import { Request, Response, Router } from 'express';

import { authentication } from '../services/account.service';

const accountRouter = Router();

accountRouter.post('/login', async (req: Request, res: Response) => {
  const { token } = await authentication(req.body);
  return res.status(200).json(token);
});

export default accountRouter;
