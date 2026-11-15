//כל הסכמות שקשורות למוצרים

import Joi from "joi";

export const productUpdateSchema = Joi.object({
        barcode: Joi.string().alphanum().min(3).max(30),
        name: Joi.string().trim(), // הוסר lowercase למנוע כפייה, או שאפשר להשאיר לפי העדפה
        description: Joi.string().min(3).max(200), // הותאם לסכמה שבה זה שדה רשות
        category: Joi.string().min(3).max(30),
        imageUrl: Joi.string().uri().allow(''), // מאפשר מחרוזת ריקה בהתאם ל-default בסכמה
    })
export const createProductSchema = Joi.object({
   barcode: Joi.string().alphanum().min(3).max(30).required(),
        name: Joi.string().trim().required(), // הוסר lowercase למנוע כפייה, או שאפשר להשאיר לפי העדפה
        description: Joi.string().min(3).max(200), // הותאם לסכמה שבה זה שדה רשות
        category: Joi.string().min(3).max(30),
        imageUrl: Joi.string().uri().allow('')
    }); // הוסר lowercase למנוע כפייה, או שאפשר להשאיר לפי העדפה
