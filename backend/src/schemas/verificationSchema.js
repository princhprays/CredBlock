import Joi from 'joi';

export const verificationSchema = Joi.object({
  hash: Joi.string().required()
}); 