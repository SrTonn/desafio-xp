import { NextFunction, Request, Response } from 'express';

import { schemaInvestmentSell } from '../joi/schemaInvestment';

const investmentSellValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaInvestmentSell.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};

export = investmentSellValidation;
