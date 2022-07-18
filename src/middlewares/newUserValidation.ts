import { NextFunction, Request, Response } from 'express';

import { schemaNewUser } from '../joi/schemaUser';

const newUserValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaNewUser.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = newUserValidation;
