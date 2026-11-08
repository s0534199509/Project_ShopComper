import Joi from 'joi';

// עזר לבדיקת תקינות של מזהה MongoDB (ObjectId) באורך 24 תווים
const mongoIdSchema = Joi.string().hex().length(24).messages({
  'string.hex': 'מזהה חייב להיות בפורמט הקסדצימלי תקין',
  'string.length': 'מזהה חייב להיות באורך 24 תווים',
  'string.base': 'מזהה חייב להיות מחרוזת'
});

// סכמה לבדיקת תקינות ביצירת מחירון חדש (POST) או עדכון מלא (PUT)
export const pricePostSchema = Joi.object({
  price: Joi.number().min(0).required().messages({
    'number.base': 'מחיר חייב להיות מספר',
    'number.min': 'מחיר חייב להיות מספר חיובי',
    'any.required': 'מחיר הוא שדה חובה'
  }),
  productId: mongoIdSchema.required().messages({
    'any.required': 'נא לספק מזהה מוצר'
  }),
  chain: mongoIdSchema.required().messages({
    'any.required': 'נא לספק מזהה רשת'
  }),
  inStock: Joi.boolean().default(true).messages({
    'boolean.base': 'שדה במלאי חייב להיות מסוג בוליאני'
  })
});

// סכמה לבדיקת תקינות בעדכון חלקי (PATCH) - למשל עדכון מחיר או מלאי בלבד
export const pricePatchSchema = Joi.object({
  price: Joi.number().min(0).messages({
    'number.base': 'מחיר חייב להיות מספר',
    'number.min': 'מחיר חייב להיות מספר חיובי'
  }),
  inStock: Joi.boolean().messages({
    'boolean.base': 'שדה במלאי חייב להיות מסוג בוליאני'
  })
});