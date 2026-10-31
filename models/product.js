import { Schema, model } from 'mongoose';


// הגדרת המבנה של מוצר (Schema)
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'נא להזין שם מוצר'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'נא להזין מחיר מוצר'],
      min: [0, 'מחיר אינו יכול להיות שלילי'],
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // מוסיף אוטומטית שדות createdAt ו-updatedAt
  }
);


// יצירת וייצוא ה-Model
const Product = model('Product', productSchema);


export default Product;