import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ShoppingCompare';
    
    await connect(mongoUri);
    console.log('MongoDB connected successfully');
  }  catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // עוצר את השרת כדי שלא ירוץ באוויר ללא מסד נתונים
  }
};