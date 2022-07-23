import { NextFunction, Request, Response } from 'express';

import { schemaInvestmentBuy } from '../joi/schemaInvestment';

const investmentBuyValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaInvestmentBuy.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = investmentBuyValidation;
