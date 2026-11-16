import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    barcode: {
      type: String,
      required: [true, 'Please enter a barcode'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter a product name'],
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
    timestamps: true,
  }
);

const Product = model('Product', productSchema);
export default Product;