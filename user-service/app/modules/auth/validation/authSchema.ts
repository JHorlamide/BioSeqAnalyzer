import Joi from "joi";

export const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const tokenRefresh = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.required": "Missing required field: refresh_token"
  })
})

export const forgotPassword = Joi.object({
  email: Joi.string().email().required()
})

export const passwordReset = Joi.object({
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  passwordToken: Joi.string().required()
})
