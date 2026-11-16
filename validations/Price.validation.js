import Joi from 'joi';

const mongoIdSchema = Joi.string().hex().length(24).messages({
  'string.hex': 'ID must be a valid hexadecimal string',
  'string.length': 'ID must be exactly 24 characters long',
  'string.base': 'ID must be a string'
});

export const pricePostSchema = Joi.object({
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be greater than or equal to 0',
    'any.required': 'Price is required'
  }),
  productId: mongoIdSchema.required().messages({
    'any.required': 'Please provide a product ID'
  }),
  chain: mongoIdSchema.required().messages({
    'any.required': 'Please provide a chain ID'
  }),
  inStock: Joi.boolean().default(true).messages({
    'boolean.base': 'In-stock status must be a boolean'
  })
});

export const pricePatchSchema = Joi.object({
  price: Joi.number().min(0).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be greater than or equal to 0'
  }),
  inStock: Joi.boolean().messages({
    'boolean.base': 'In-stock status must be a boolean'
  })
});