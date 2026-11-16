import { Schema, model } from 'mongoose';

const priceSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  chain: {
    type: Schema.Types.ObjectId,
    ref: 'Chain',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const Price = model('Price', priceSchema);
export default Price;