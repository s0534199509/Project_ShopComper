import User from '../models/User.js';
import Cart from '../models/Cart.js';
import { AppError } from '../utils/appErrors.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('A user with this email already exists', 409, 'Conflict');
    }

    const user = new User({ name, email });
    await user.setPassword(password);
    await user.save();

    await Cart.create({ user: user._id, items: [] });

    res.status(201).json({
      message: 'Registration successful',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      error = new AppError('A user with this email already exists', 409, 'Conflict');
    } else if (!(error instanceof AppError)) {
      console.error('Error registering user:', error);
      error = new AppError('An error occurred while registering the user', 500);
    }
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await user.verifyPassword(password))) {
      throw new AppError('Invalid email or password', 401, 'Unauthorized');
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error('Error logging in user:', error);
      error = new AppError('An error occurred while logging in the user', 500);
    }
    next(error);
  }
};