import { NextFunction, Request, Response } from 'express';

import { schemaWallet } from '../joi/schemaWallet';

const walletValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaWallet.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = walletValidation;
