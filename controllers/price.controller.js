import Price from '../models/Price.js';

// שליפת כל המחירונים כולל פרטי המוצר והרשת
export const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find()
      .populate('product') // מאכלס את פרטי המוצר
      .populate('chain');   // מאכלס את פרטי הרשת
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// יצירת מחיר חדש למוצר ברשת ספציפית
export const createPrice = async (req, res) => {
  try {
    const newPrice = await Price.create(req.body);
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};