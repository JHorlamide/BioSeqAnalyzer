import Joi from "joi";

export const registerUser = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const invitation = Joi.object({
  userEmail: Joi.string().email().required(),
  projectId: Joi.string().required(),
  projectName: Joi.string().required(),
});

export const acceptInvitation = Joi.object({
  invitationToken: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  fullName: Joi.string().optional(),
  password: Joi.string().required()
})
