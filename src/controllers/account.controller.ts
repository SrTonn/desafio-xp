import { Request, Response, Router } from 'express';
import {
  authValidation,
  newUserValidation,
  userLoginValidation,
  updateUserValidation,
} from '../middlewares';

import {
  authentication,
  createUser,
  updateUser,
  removeUser,
  getUser,
} from '../services/account.service';

const accountRouter = Router();

accountRouter.post('/login', userLoginValidation, async (req: Request, res: Response) => {
  const { token } = await authentication(req.body);
  return res.status(200).json(token);
});

accountRouter.post('/new', newUserValidation, async (req: Request, res: Response) => {
  const { token } = await createUser(req.body);
  return res.status(201).json(token);
});

accountRouter
  .put('/update', authValidation, updateUserValidation, async (req: Request, res: Response) => {
    const { id } = res.locals.payload;
    const response = await updateUser(id, req.body);
    return res.status(200).json(response);
  });

accountRouter.delete('/remove/me', authValidation, async (req: Request, res: Response) => {
  const { id } = res.locals.payload;
  await removeUser(id);
  return res.sendStatus(204);
});

accountRouter.get('/me', authValidation, async (_req: Request, res: Response) => {
  const { id } = res.locals.payload;
  const response = await getUser(id);
  return res.status(200).json(response);
});

export default accountRouter;
