import {Router} from 'express';
import{
    createChain,
    deleteChain,
    getAllChains,
    getChainById,
    patchChain,
    updateChain,
} from '../controllers/chain.controller.js';

const router = Router();

router.get('/', getAllChains);
router.get('/:id', getChainById);
router.post('/', createChain);
router.put('/:id', updateChain);
router.patch('/:id', patchChain);
router.delete('/:id', deleteChain);

export default router;