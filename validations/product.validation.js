
import Joi from "joi";

export const productUpdateSchema = Joi.object({
        barcode: Joi.string().alphanum().min(3).max(30),
        name: Joi.string().trim(),
        description: Joi.string().min(3).max(200),
        category: Joi.string().min(3).max(30),
        imageUrl: Joi.string().uri().allow(''),
    })
export const createProductSchema = Joi.object({
   barcode: Joi.string().alphanum().min(3).max(30).required(),
        name: Joi.string().trim().required(),
        description: Joi.string().min(3).max(200),
        category: Joi.string().min(3).max(30),
        imageUrl: Joi.string().uri().allow('')
    });
