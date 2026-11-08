import { Router } from 'express';
import {
  getAllPrices,
  getPriceById,
  createPrice,
  updatePrice,
  patchPrice,
  deletePrice,
} from '../controllers/price.controller.js';
import { validateBody } from '../middlewares/custom.middleware.js';
import { pricePostSchema, pricePatchSchema } from '../validations/Price.validation.js' ;

const router = Router();

// שליפת כל המחירונים
router.get('/', getAllPrices);

// שליפת מחירון ספציפי לפי מזהה
router.get('/:id', getPriceById);

// יצירת מחירון חדש (כולל בדיקת תקינות מלאה)
router.post('/', validateBody(pricePostSchema), createPrice);

// עדכון מלא של מחירון
router.put('/:id', validateBody(pricePostSchema), updatePrice);

// עדכון חלקי של מחירון (כולל בדיקת תקינות חלקית)
router.patch('/:id', validateBody(pricePatchSchema), patchPrice);

// מחיקת מחירון
router.delete('/:id', deletePrice);

export default router;