import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  patchProduct,
  updateProduct,
} from '../controllers/product.controller.js';
import { validateBody } from '../middlewares/custom.middleware.js';
import { createProductSchema, productUpdateSchema } from '../validations/product.validation.js';

const router = Router();


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateBody(createProductSchema),  createProduct);
router.put('/:id', validateBody(createProductSchema), updateProduct);
router.patch('/:id', validateBody(productUpdateSchema), patchProduct);
router.delete('/:id', deleteProduct);


export default router;