import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  patchProduct,
  updateProduct,
} from '../controllers/product.controller.js';


const router = Router();


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id', patchProduct);
router.delete('/:id', deleteProduct);


export default router;