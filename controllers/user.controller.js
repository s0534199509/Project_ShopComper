import User from '../models/user.js';
import Cart from '../models/Cart.js';

// הרשמת משתמש חדש ויצירת עגלה ראשונית
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'משתמש עם אימייל זה כבר קיים במערכת' });
    }

    // יצירת המשתמש
    const user = await User.create({ name, email, password });

    // יצירת עגלה ריקה המשויכת למשתמש החדש
    await Cart.create({ user: user._id, items: [] });

    res.status(201).json({
      message: 'ההרשמה בוצעה בהצלחה',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בהרשמת המשתמש', error: error.message });
  }
};

// התחברות משתמש קיים
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'אימייל או סיסמה שגויים' });
    }

    res.status(200).json({
      message: 'התחברות בוצעה בהצלחה',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בהתחברות', error: error.message });
  }
};