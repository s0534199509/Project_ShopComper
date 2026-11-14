import Joi from 'joi';

// 1. סכמת בדיקת תקינות להרשמת משתמש חדש (POST /users/register)
export const registerUserSchema = Joi.object({
  // שם משתמש: מנקה רווחים מיותרים בקצוות, בין 2 ל-25 תווים, חובה
  name: Joi.string().trim().min(2).max(25).required().messages({
    'string.empty': 'נא להזין שם משתמש',
    'string.min': 'שם משתמש חייב להכיל לפחות 2 תווים',
    'string.max': 'שם משתמש יכול להכיל עד 25 תווים',
    'any.required': 'נא להזין שם משתמש',
  }),

  // אימייל: מנקה רווחים, הופך אוטומטית לאותיות קטנות ובודק פורמט מייל חוקי
  email: Joi.string().trim().lowercase().email().max(254).required().messages({
    'string.empty': 'נא להזין כתובת אימייל',
    'string.email': 'כתובת האימייל אינה תקינה',
    'any.required': 'נא להזין כתובת אימייל',
  }),

  // סיסמה: לפחות 4 תווים, עד 50 תווים, ומוודא שלא מורכבת מרווחים בלבד
  password: Joi.string().min(4).max(50).pattern(/\S/).required().messages({
    'string.empty': 'נא להזין סיסמה',
    'string.min': 'הסיסמה חייבת להכיל לפחות 4 תווים',
    'string.pattern.base': 'הסיסמה לא יכולה להכיל רווחים בלבד',
    'any.required': 'נא להזין סיסמה',
  }),
});

// 2. סכמת בדיקת תקינות להתחברות משתמש קיים (POST /users/login)
export const loginUserSchema = Joi.object({
  // אימייל: חייב להיות בפורמט תקין ומותאם לאותיות קטנות כמו שנשמר בהרשמה
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'נא להזין כתובת אימייל',
    'string.email': 'כתובת האימייל אינה תקינה',
    'any.required': 'נא להזין כתובת אימייל',
  }),

  // סיסמה: מוודא שנשלחה סיסמה באורך תקין לפני שפונים להצפנה
  password: Joi.string().min(4).max(50).required().messages({
    'string.empty': 'נא להזין סיסמה',
    'string.min': 'הסיסמה חייבת להכיל לפחות 4 תווים',
    'any.required': 'נא להזין סיסמה',
  }),
});