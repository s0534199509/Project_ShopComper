import Joi from 'joi';

// סכמה משותפת לבדיקת תקינות של מזהה מוצר (ObjectId של מונגו)
const mongoIdSchema = Joi.string().hex().length(24).messages({
  'string.hex': 'מזהה חייב להיות בפורמט הקסדצימלי תקין',
  'string.length': 'מזהה חייב להיות באורך 24 תווים',
  'string.base': 'מזהה חייב להיות מחרוזת'
});

// 1. סכמה להוספת מוצר לעגלה (POST /cart)
// תואמת בדיוק למה שהקונטרולר מצפה לקבל ב-req.body
export const addToCartSchema = Joi.object({
  userId: mongoIdSchema.required().messages({
    'any.required': 'נא לספק מזהה משתמש'
  }),
  productId: mongoIdSchema.required().messages({
    'any.required': 'נא לספק מזהה מוצר'
  }),
  quantity: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'הכמות חייבת להיות מספר',
    'number.min': 'כמות חייבת להיות לפחות 1'
  })
});

// 2. סכמה להסרת מוצר מהעגלה (DELETE /cart/item)
// תואמת לקונטרולר שלך שדורש userId ו-productId ב-req.body לצורך מחיקה
export const removeFromCartSchema = Joi.object({
  userId: mongoIdSchema.required().messages({
    'any.required': 'נא לספק מזהה משתמש'
  }),
  productId: mongoIdSchema.required().messages({
    'any.required': 'נא לספק מזהה מוצר למחיקה'
  })
});