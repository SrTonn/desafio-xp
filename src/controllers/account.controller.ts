import { Request, Response, Router } from 'express';
import {
  authValidation,
  newUserValidation,
  userLoginValidation,
  updateUserValidation,
} from '../middlewares';

import { authentication, createUser, updateUser } from '../services/account.service';

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

export default accountRouter;
