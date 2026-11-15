import Cart from '../models/Cart.js';
import { AppError } from '../utils/appErrors.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) {
      throw new AppError('עגלה לא נמצאה', 404, 'Not Found');
    }
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('שגיאה בשליפת העגלה', 500);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    const updatedCart = await cart.populate('items.product');
    res.status(200).json(updatedCart);
  } catch (error) {
    throw new AppError('שגיאה בעדכון העגלה', 500);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new AppError('עגלה לא נמצאה', 404, 'Not Found');
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    const updatedCart = await cart.populate('items.product');
    res.status(200).json(updatedCart);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('שגיאה בהסרת מוצר', 500);
  }
};