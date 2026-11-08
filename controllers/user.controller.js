import User from '../models/User.js';
import Cart from '../models/Cart.js';

// הרשמת משתמש חדש ויצירת עגלה ראשונית
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'משתמש עם אימייל זה כבר קיים במערכת' });
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
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({ message: 'משתמש עם אימייל זה כבר קיים במערכת' });
    }

    console.error('Error registering user:', error);
    res.status(500).json({ message: 'שגיאה בהרשמת המשתמש' });
  }
};

// התחברות משתמש קיים
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
    }

    res.status(200).json({
      message: 'התחברות בוצעה בהצלחה',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'שגיאה בהתחברות' });
  }
};