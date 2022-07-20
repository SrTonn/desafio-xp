import { NextFunction, Request, Response } from 'express';

import { schemaInvestment } from '../joi/schemaInvestment';

const investmentValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaInvestment.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = investmentValidation;
