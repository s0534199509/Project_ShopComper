import { Schema, model } from 'mongoose';

// סכמה פנימית לפריט בודד בתוך העגלה
const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'נא לקשר מוצר'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'כמות חייבת להיות לפחות 1'],
      default: 1,
    },
  },
  { _id: false }
);

// סכמת העגלה הראשית המקושרת למשתמש
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'נא לקשר משתמש'],
      unique: true, // מבטיח עגלה פעילה אחת בלבד לכל משתמש
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = model('Cart', cartSchema);
export default Cart;