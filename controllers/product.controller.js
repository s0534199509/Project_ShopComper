import Product from '../models/Product.js';
import { AppError } from '../utils/appErrors.js';


// GET all products
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};


// GET product by ID
export const getProductById = async (req, res, next) => {
    try {

        const product = await Product.findById(req.params.id);
        if (!product) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// POST create product
export const createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        next(error);
    }
};


// PUT update full product
export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};


// PATCH update partial product
export const patchProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};


// DELETE product
export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};