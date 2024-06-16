import Joi from "joi";

export const userValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number(),
  password: Joi.string().min(6).max(12).required(),
});
