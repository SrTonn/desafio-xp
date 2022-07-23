import Joi from 'joi';

const schemaInvestmentBuy = Joi.object().keys({
  stock: Joi.string().min(4).max(6).required(),
  value: Joi.number().min(1).required(),
});

const schemaInvestmentSell = Joi.object().keys({
  stock: Joi.string().min(4).max(6).required(),
  quantity: Joi.number().min(1).integer().required(),
});

export {
  schemaInvestmentBuy,
  schemaInvestmentSell,
};
