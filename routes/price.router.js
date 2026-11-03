import { Router } from 'express';
import { getAllPrices, createPrice } from '../controllers/price.controller.js';

const router = Router();

router.get('/', getAllPrices);
router.post('/', createPrice);

export default router;