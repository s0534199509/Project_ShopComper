
import jwt from 'jsonwebtoken';

export const createToken = ({ _id, role }) => {
  const payload = { userId: _id, role };
  const secret = process.env.JWT_SECRET ?? 'secret';
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};