import Price from '../models/Price.js';
import { AppError } from '../utils/appErrors.js';

// שליפת כל המחירונים כולל פרטי המוצר והרשת
export const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find()
      .populate('product') // מאכלס את פרטי המוצר
      .populate('chain');   // מאכלס את פרטי הרשת
    res.status(200).json(prices);
  } catch (error) {
    throw error;
  }
};

// שליפת מחירון ספציפי לפי מזהה
export const getPriceById = async (req, res) => {
  try {
    const price = await Price.findById(req.params.id)
      .populate('product')
      .populate('chain');
      
    if (!price) {
      throw new AppError('מחירון לא נמצא', 404, 'Not Found');
    }
    res.status(200).json(price);
  } catch (error) {
    throw error;
  }
};

// יצירת מחיר חדש למוצר ברשת ספציפית
export const createPrice = async (req, res) => {
  try {
    const newPrice = await Price.create(req.body);
    const populatedPrice = await newPrice.populate(['product', 'chain']);
    res.status(201).json(populatedPrice);
  } catch (error) {
    throw error;
  }
};

// עדכון מלא של מחירון (PUT)
export const updatePrice = async (req, res) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(['product', 'chain']);

    if (!updatedPrice) {
      throw new AppError('מחירון לא נמצא', 404, 'Not Found');
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    throw error;
  }
};

// עדכון חלקי של מחירון (PATCH)
export const patchPrice = async (req, res) => {
  try {
    const updatedPrice = await Price.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate(['product', 'chain']);

    if (!updatedPrice) {
      throw new AppError('מחירון לא נמצא', 404, 'Not Found');
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    throw error;
  }
};

// מחיקת מחירון
export const deletePrice = async (req, res) => {
  try {
    const deletedPrice = await Price.findByIdAndDelete(req.params.id);
    if (!deletedPrice) {
      throw new AppError('מחירון לא נמצא', 404, 'Not Found');
    }
    res.status(200).json({ message: 'המחירון נמחק בהצלחה' });
  } catch (error) {
    throw error;
  }
};