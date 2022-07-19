import { NextFunction, Request, Response } from 'express';

import { schemaUpdateUser } from '../joi/schemaUser';

const updateUserValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaUpdateUser.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = updateUserValidation;
