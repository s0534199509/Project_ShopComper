import express from 'express';
import { addToCartSchema, removeFromCartSchema } from '../validations/cart.validation.js';
import { validateBody } from '../middlewares/validatoloi.middleware.js';
import { 
  getCart, 
  addToCart, 
  removeFromCart 
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/:userId', getCart);

router.post('/', validateBody(addToCartSchema), addToCart);

router.delete('/item', validateBody(removeFromCartSchema), removeFromCart);

export default router;