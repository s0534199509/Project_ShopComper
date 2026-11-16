import { Schema, model } from 'mongoose';

const chainSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a chain name'],
    trim: true,
  },
  logoUrl: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Chain = model('Chain', chainSchema);
export default Chain;