import Price from '../models/Price.js';
import { AppError } from '../utils/appErrors.js';

export const getAllPrices = async (req, res, next) => {
  try {
    const prices = await Price.find()
      .populate('product')
      .populate('chain');
    res.status(200).json(prices);
  } catch (error) {
    next(error);
  }
};

export const getPriceById = async (req, res, next) => {
  try {
    const price = await Price.findById(req.params.id)
      .populate('product')
      .populate('chain');
      
    if (!price) {
      throw new AppError('Price not found', 404, 'Not Found');
    }
    res.status(200).json(price);
  } catch (error) {
    next(error);
  }
};

export const createPrice = async (req, res, next) => {
  try {
    const newPrice = await Price.create(req.body);
    const populatedPrice = await newPrice.populate(['product', 'chain']);
    res.status(201).json(populatedPrice);
  } catch (error) {
    next(error);
  }
};

export const updatePrice = async (req, res, next) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(['product', 'chain']);

    if (!updatedPrice) {
      throw new AppError('Price not found', 404, 'Not Found');
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    next(error);
  }
};

export const patchPrice = async (req, res, next) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate(['product', 'chain']);

    if (!updatedPrice) {
      throw new AppError('Price not found', 404, 'Not Found');
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    next(error);
  }
};

export const deletePrice = async (req, res, next) => {
  try {
    const deletedPrice = await Price.findByIdAndDelete(req.params.id);
    if (!deletedPrice) {
      throw new AppError('Price not found', 404, 'Not Found');
    }
    res.status(200).json({ message: 'Price deleted successfully' });
  } catch (error) {
    next(error);
  }
};