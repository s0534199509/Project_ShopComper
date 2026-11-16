import Joi from 'joi';

const mongoIdSchema = Joi.string().hex().length(24).messages({
  'string.hex': 'ID must be a valid hexadecimal string',
  'string.length': 'ID must be exactly 24 characters long',
  'string.base': 'ID must be a string'
});

export const addToCartSchema = Joi.object({
  userId: mongoIdSchema.required().messages({
    'any.required': 'Please provide a user ID'
  }),
  productId: mongoIdSchema.required().messages({
    'any.required': 'Please provide a product ID'
  }),
  quantity: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1'
  })
});

export const removeFromCartSchema = Joi.object({
  userId: mongoIdSchema.required().messages({
    'any.required': 'Please provide a user ID'
  }),
  productId: mongoIdSchema.required().messages({
    'any.required': 'Please provide a product ID to remove'
  })
});