import chain from '../models/Chain.js';
import { AppError } from '../utils/appErrors.js';

// GET all chains
export const getAllChains = async (req, res) => {
    try {
        const chains = await chain.find({});
        res.status(200).json(chains);
    } catch (error) {
        throw error;
    }  
};

export const getChainById = async (req, res) => {
    try {
        const foundChain = await chain.findById(req.params.id);
        if (!foundChain) {
            throw new AppError('Chain not found', 404, 'Not Found');
        }
        res.status(200).json(foundChain);
    } catch (error) {
        throw error;
    }
};

export const createChain = async (req, res) => {
    try {
        const newChain = await chain.create(req.body);
        res.status(201).json(newChain);
    } catch (error) {
        throw error;
    }
};

export const updateChain = async (req, res) => {
    try {
        const updatedChain = await chain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedChain) {
            throw new AppError('Chain not found', 404, 'Not Found');
        }
        res.status(200).json(updatedChain);
    } catch (error) {
        throw error;
    }  
};

export const patchChain = async (req, res) => {
    try {
        const updatedChain = await chain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedChain) {
            throw new AppError('Chain not found', 404, 'Not Found');
        }
        res.status(200).json(updatedChain);
    } catch (error) {
        throw error;
    }
};  

export const deleteChain = async (req, res) => {
    try {
        const deletedChain = await chain.findByIdAndDelete(req.params.id);
        if (!deletedChain) {
            throw new AppError('Chain not found', 404, 'Not Found');
        }
        res.status(200).json({ message: 'Chain deleted successfully' });
    } catch (error) {
        throw error;
    }  
};