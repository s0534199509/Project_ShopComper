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

// שליפת מחירון ספציפי לפי מזהה
export const getPriceById = async (req, res) => {
  try {
    const price = await Price.findById(req.params.id)
      .populate('product')
      .populate('chain');
      
    if (!price) {
      return res.status(404).json({ message: 'מחירון לא נמצא' });
    }
    res.status(200).json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// יצירת מחיר חדש למוצר ברשת ספציפית
export const createPrice = async (req, res) => {
  try {
    const newPrice = await Price.create(req.body);
    const populatedPrice = await newPrice.populate(['product', 'chain']);
    res.status(201).json(populatedPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: 'מחירון לא נמצא' });
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: 'מחירון לא נמצא' });
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// מחיקת מחירון
export const deletePrice = async (req, res) => {
  try {
    const deletedPrice = await Price.findByIdAndDelete(req.params.id);
    if (!deletedPrice) {
      return res.status(404).json({ message: 'מחירון לא נמצא' });
    }
    res.status(200).json({ message: 'המחירון נמחק בהצלחה' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};