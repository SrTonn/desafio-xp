import { NextFunction, Request, Response } from 'express';

import { schemaLogin } from '../joi/schemaUser';

const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = validateUserMiddleware;
