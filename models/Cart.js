import { model, Schema, SchemaTypes } from "mongoose";

const cartItemSchema = new Schema(
  {
    product: {
      type: SchemaTypes.ObjectId,
      ref: 'Product',
      required: [true, 'Please link a product'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Please link a user'],
      unique: true,
    },
    chain: {
      type: SchemaTypes.ObjectId,
      ref: 'Chain',
      required: [true, 'Please link a retail chain to the cart'],
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = model('carts', cartSchema);
export default Cart;