import express from 'express';
import { addToCartSchema, removeFromCartSchema } from '../validations/Cart.valisation.js';
import { validateBody } from '../middlewares/custom.middleware.js';
import { 
  getCart, 
  addToCart, 
  removeFromCart 
} from '../controllers/cart.controller.js';

const router = express.Router();

// 1. צפייה בעגלה לפי מזהה משתמש בנתיב
router.get('/:userId', getCart);

// 2. הוספת מוצר לעגלה (מופעלת בדיקת תקינות addToCartSchema)
router.post('/', validateBody(addToCartSchema), addToCart);

// 3. הסרת מוצר מהעגלה (מופעלת בדיקת תקינות removeFromCartSchema)
router.delete('/item', validateBody(removeFromCartSchema), removeFromCart);

export default router;