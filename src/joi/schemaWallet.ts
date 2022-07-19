import Joi from 'joi';

const schemaWallet = Joi.object().keys({
  value: Joi.number().min(1).required(),
});

export {
  schemaWallet,
};
