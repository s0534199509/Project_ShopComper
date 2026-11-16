import { Router } from 'express';
import {
  getAllPrices,
  getPriceById,
  createPrice,
  updatePrice,
  patchPrice,
  deletePrice,
} from '../controllers/price.controller.js';
import { validateBody } from '../middlewares/validatoloi.middleware.js';
import { pricePostSchema, pricePatchSchema } from '../validations/price.validation.js' ;

const router = Router();

router.get('/', getAllPrices);

router.get('/:id', getPriceById);

router.post('/', validateBody(pricePostSchema), createPrice);

router.put('/:id', validateBody(pricePostSchema), updatePrice);

router.patch('/:id', validateBody(pricePatchSchema), patchPrice);

router.delete('/:id', deletePrice);

export default router;