import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'נא להזין שם משתמש'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'נא להזין כתובת אימייל'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'נא להזין סיסמה'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);
export default User;