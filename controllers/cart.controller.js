import Cart from '../models/Cart.js';
import Price from '../models/Price.js';
import { AppError } from '../utils/appErrors.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate('chain')
      .populate('items.product');

    if (!cart) {
      throw new AppError('Cart not found', 404, 'Not Found');
    }

    const itemsWithPrices = await Promise.all(
      cart.items.map(async (item) => {
        const priceDoc = await Price.findOne({
          product: item.product._id,
          chain: cart.chain._id,
        });

        return {
          product: item.product,
          quantity: item.quantity,
          price: priceDoc ? priceDoc.price : 0,
          inStock: priceDoc ? priceDoc.inStock : false,
        };
      })
    );

    const totalPrice = itemsWithPrices.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.status(200).json({
      user: cart.user,
      chain: cart.chain,
      items: itemsWithPrices,
      totalPrice,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, chainId, quantity = 1 } = req.body;
    
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, chain: chainId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      throw new AppError('Cart not found', 404, 'Not Found');
    }
    
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};