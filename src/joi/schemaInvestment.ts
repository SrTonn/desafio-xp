import Joi from 'joi';

const schemaInvestment = Joi.object().keys({
  stock: Joi.string().min(4).max(6).required(),
  value: Joi.number().min(1).required(),
});

export { schemaInvestment };
