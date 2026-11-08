import { Router } from 'express';
import {
  getAllChains,
  getChainById,
  createChain,
  updateChain,
  patchChain,
  deleteChain,
} from '../controllers/chain.controller.js';
import { validateBody } from '../middlewares/custom.middleware.js';
import { chainPostSchema, chainPatchSchema } from '../validations/Chain.validation.js';

const router = Router();

// שליפת כל רשתות השיווק
router.get('/', getAllChains);

// שליפת רשת שיווק ספציפית לפי מזהה
router.get('/:id', getChainById);

// יצירת רשת שיווק חדשה (כולל בדיקת תקינות מלאה)
router.post('/', validateBody(chainPostSchema), createChain);

// עדכון מלא של רשת שיווק
router.put('/:id', validateBody(chainPostSchema), updateChain);

// עדכון חלקי של רשת שיווק (כולל בדיקת תקינות חלקית)
router.patch('/:id', validateBody(chainPatchSchema), patchChain);

// מחיקת רשת שיווק
router.delete('/:id', deleteChain);

export default router;