import { connect } from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/your-database-name';
  await connect(mongoUri);
  console.log('MongoDB connected');
};