import chain from '../models/Chain.js';

// GET all chains
export const getAllChains = async (req, res) => {
    try {
        const chains = await chain.find({});
        res.status(200).json(chains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
};

export const getChainById = async (req, res) => {
    try {
        const foundChain = await chain.findById(req.params.id);
        if (!foundChain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.status(200).json(foundChain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createChain = async (req, res) => {
    try {
        const newChain = await chain.create(req.body);
        res.status(201).json(newChain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateChain = async (req, res) => {
    try {
        const updatedChain = await chain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const updatedChain = await chain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const deletedChain = await chain.findByIdAndDelete(req.params.id);
        if (!deletedChain) {
            return res.status(404).json({ message: 'Chain not found' });
        }
        res.status(200).json({ message: 'Chain deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
};