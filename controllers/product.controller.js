import Product from '../models/Product.js'; // תוקן הנתיב מ-./ ל-../
import { AppError } from '../utils/appErrors.js'; // ייבוא מחלקת AppError


// GET all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        throw error;
    }
};


// GET product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: 'Product not found' });
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
//עם החזרת שגיאה
export const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        if (!product) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json(product);
    } catch (error) {
        throw error;
    }
};

// POST create product
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        throw error;
    }
};


// PUT update full product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json(updatedProduct);
    } catch (error) {
        throw error;
    }
};


// PATCH update partial product
export const patchProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json(updatedProduct);
    } catch (error) {
        throw error;
    }
};


// DELETE product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) throw new AppError('Product not found', 404, 'Not Found');
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        throw error;
    }
};