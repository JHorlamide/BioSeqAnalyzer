import Joi from "joi";

export const registerUser = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});
