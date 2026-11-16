import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.router.js';
import chainRouter from './routes/chain.router.js';
import priceRouter from './routes/price.router.js';
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/user.router.js';
import { printMsg } from './middlewares/custom.middleware.js';
import { errorHandler, pathNotFound } from './middlewares/errors.middleware.js';

const app = express();

connectDB();
app.use(printMsg);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/products', productRouter);
app.use('/chains', chainRouter);
app.use('/prices', priceRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use(pathNotFound);
app.use(errorHandler);
const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});