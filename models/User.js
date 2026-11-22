import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a user name'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    email: {
      type: String,
      required: [true, 'Please enter an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, returnedObject) {
        delete returnedObject.password;
        return returnedObject;
      },
    },
    toObject: {
      transform(_document, returnedObject) {
        delete returnedObject.password;
        return returnedObject;
      },
    },
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
export default User;