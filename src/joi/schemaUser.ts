import Joi from 'joi';

const schemaLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemaNewUser = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
});

export {
  schemaLogin,
  schemaNewUser,
};
