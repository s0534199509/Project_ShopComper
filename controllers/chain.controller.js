import chainService from '../services/chain.service.js';

// GET all chains
export const getAllChains = async (req, res) => {
    try {
        const chains = await chainService.getAllChains();
        res.status(200).json(chains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
export const getChainById = async (req, res) => {
    try {
        const chain = await chainService.getChainById(req.params.id);
        if (!chain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.status(200).json(chain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createChain = async (req, res) => {
    try {
        const newChain = await chainService.createChain(req.body);
        res.status(201).json(newChain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateChain = async (req, res) => {
    try {
        const updatedChain = await chainService.updateChain(req.params.id, req.body);
        if (!updatedChain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.status(200).json(updatedChain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};
export const patchChain = async (req, res) => {
    try {
        const updatedChain = await chainService.patchChain(req.params.id, req.body);
        if (!updatedChain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.status(200).json(updatedChain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  
export const deleteChain = async (req, res) => {
    try {
        const deletedChain = await chainService.deleteChain(req.params.id);
        if (!deletedChain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.status(200).json({ message: 'Chain deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
