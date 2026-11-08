import { Schema, model } from 'mongoose';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const PASSWORD_HASH_LENGTH = 64;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'נא להזין שם משתמש'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'נא להזין כתובת אימייל'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, returnedObject) {
        delete returnedObject.passwordHash;
        return returnedObject;
      },
    },
    toObject: {
      transform(_document, returnedObject) {
        delete returnedObject.passwordHash;
        return returnedObject;
      },
    },
  }
);

userSchema.methods.setPassword = async function (password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, PASSWORD_HASH_LENGTH);
  this.passwordHash = `${salt}:${hash.toString('hex')}`;
};

userSchema.methods.verifyPassword = async function (password) {
  const [salt, storedHash] = this.passwordHash?.split(':') ?? [];
  if (!salt || !storedHash || !/^[a-f\d]{32}$/i.test(salt) || !/^[a-f\d]{128}$/i.test(storedHash)) {
    return false;
  }

  const expectedHash = Buffer.from(storedHash, 'hex');
  const actualHash = await scrypt(password, salt, PASSWORD_HASH_LENGTH);
  return timingSafeEqual(expectedHash, actualHash);
};

const User = model('User', userSchema);
export default User;