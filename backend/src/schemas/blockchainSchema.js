import Joi from 'joi';
 
export const blockchainSchema = Joi.object({
  hash: Joi.string().required()
}); 