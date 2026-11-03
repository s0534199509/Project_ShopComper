import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.router.js';
import chainRouter from './routes/chain.router.js';
import priceRouter from './routes/price.router.js';
import userRouter from './routes/user.router.js';
import cartRouter from './routes/Cart.router.js';

// 1. יצירת שרת אקספרס
const app = express();

// התחברות למסד הנתונים
connectDB();

// הגדרות שרת
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. ניתובים
app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/products', productRouter);
app.use('/chains', chainRouter);
app.use('/prices', priceRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);

// 3. הרצת השרת
const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});