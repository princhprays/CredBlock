import Joi from 'joi';
import { ValidationError } from '../utils/errors.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      throw new ValidationError(errorMessage);
    }

    next();
  };
};

// Validation schemas
export const schemas = {
  issueCredential: Joi.object({
    studentName: Joi.string().required(),
    universityName: Joi.string().required(),
    degree: Joi.string().required(),
    graduationDate: Joi.date().iso().required(),
    issuedDate: Joi.date().iso().required(),
    metadata: Joi.object().pattern(Joi.string(), Joi.any())
  }),

  verifyCredential: Joi.object({
    hash: Joi.string().required(),
    signature: Joi.string().required(),
    merkleProof: Joi.array().items(Joi.string()).required()
  }),

  blockchainQuery: Joi.object({
    hash: Joi.string().required()
  })
}; 