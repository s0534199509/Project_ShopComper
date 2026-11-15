import User from '../models/User.js';
import Cart from '../models/Cart.js';
import { AppError } from '../utils/appErrors.js';

// הרשמת משתמש חדש ויצירת עגלה ראשונית
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('משתמש עם אימייל זה כבר קיים במערכת', 409, 'Conflict');
    }

    // יצירת המשתמש
    const user = new User({ name, email });
    await user.setPassword(password);
    await user.save();

    // יצירת עגלה ריקה המשויכת למשתמש החדש
    await Cart.create({ user: user._id, items: [] });

    res.status(201).json({
      message: 'ההרשמה בוצעה בהצלחה',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new AppError('משתמש עם אימייל זה כבר קיים במערכת', 409, 'Conflict');
    }

    console.error('Error registering user:', error);
    throw new AppError('שגיאה בהרשמת המשתמש', 500);
  }
};

// התחברות משתמש קיים
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await user.verifyPassword(password))) {
      throw new AppError('אימייל או סיסמה שגויים', 401, 'Unauthorized');
    }

    res.status(200).json({
      message: 'התחברות בוצעה בהצלחה',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error logging in user:', error);
    throw new AppError('שגיאה בהתחברות', 500);
  }
};