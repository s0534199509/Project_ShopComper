import { Router } from 'express';
import {
  getAllChains,
  getChainById,
  createChain,
  updateChain,
  patchChain,
  deleteChain,
} from '../controllers/chain.controller.js';
import { validateBody } from '../middlewares/validatoloi.middleware.js';
import { chainPostSchema, chainPatchSchema } from '../validations/chain.validation.js';

const router = Router();

router.get('/', getAllChains);

router.get('/:id', getChainById);

router.post('/', validateBody(chainPostSchema), createChain);

router.put('/:id', validateBody(chainPostSchema), updateChain);

router.patch('/:id', validateBody(chainPatchSchema), patchChain);

router.delete('/:id', deleteChain);

export default router;