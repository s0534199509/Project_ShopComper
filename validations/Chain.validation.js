import Joi from 'joi';

export const chainPostSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.base': 'Chain name must be a string',
    'string.empty': 'Please enter a chain name',
    'string.min': 'Chain name must be at least 2 characters long',
    'string.max': 'Chain name cannot exceed 50 characters',
    'any.required': 'Please enter a chain name'
  }),
  logoUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Logo URL must be a valid URL'
  }),
  isActive: Joi.boolean().messages({
    'boolean.base': 'Activity status must be a boolean'
  })
});

export const chainPatchSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).messages({
    'string.base': 'Chain name must be a string',
    'string.min': 'Chain name must be at least 2 characters long',
    'string.max': 'Chain name cannot exceed 50 characters'
  }),
  logoUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Logo URL must be a valid URL'
  }),
  isActive: Joi.boolean().messages({
    'boolean.base': 'Activity status must be a boolean'
  })
});