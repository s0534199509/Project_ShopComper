import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    barcode: {
      type: String,
      required: [true, 'נא להזין ברקוד'],
      unique: true, // מבטיח שלא נכניס בטעות פעמיים את אותו מוצר
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'נא להזין שם מוצר'],
      trim: true,
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
  },
  {
    timestamps: true, // מוסיף אוטומטית שדות createdAt ו-updatedAt
  }
);

const Product = model('Product', productSchema);
export default Product;