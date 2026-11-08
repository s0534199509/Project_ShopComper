import Joi from 'joi';

// סכמה לבדיקת תקינות ביצירת רשת שיווק חדשה (POST) או עדכון מלא (PUT)
export const chainPostSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.base': 'שם הרשת חייב להיות מחרוזת',
    'string.empty': 'נא להזין שם רשת',
    'string.min': 'שם הרשת חייב להכיל לפחות 2 תווים',
    'string.max': 'שם הרשת יכול להכיל עד 50 תווים',
    'any.required': 'נא להזין שם רשת'
  }),
  logoUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'כתובת הלוגו חייבת להיות כתובת אינטרנט תקנית (URL)'
  }),
  isActive: Joi.boolean().messages({
    'boolean.base': 'שדה פעילות חייב להיות מסוג בוליאני'
  })
});

// סכמה לבדיקת תקינות בעדכון חלקי של רשת שיווק (PATCH)
export const chainPatchSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).messages({
    'string.base': 'שם הרשת חייב להיות מחרוזת',
    'string.min': 'שם הרשת חייב להכיל לפחות 2 תווים',
    'string.max': 'שם הרשת יכול להכיל עד 50 תווים'
  }),
  logoUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'כתובת הלוגו חייבת להיות כתובת אינטרנט תקנית (URL)'
  }),
  isActive: Joi.boolean().messages({
    'boolean.base': 'שדה פעילות חייב להיות מסוג בוליאני'
  })
});