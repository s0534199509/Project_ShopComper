import express from 'express'
import { connectDB } from './config/db.js';
import productRouter from './routes/product.router.js';
import chainRouter from './routes/chain.router.js';
import priceRouter from './routes/price.router.js';

// 1. יצירת שרת אקספרס
const app = express();

connectDB();

// הגדרות על השרת

// מקבל באדי מסוג אוביקט גייסון - { ... }
app.use(express.json());

app.use('/prices', priceRouter);

// מקבל באדי מסוג טופס, אם רוצים להעלות תמונה/קובץ - FormData
app.use(express.urlencoded({ extended: true }));

// 2. מה לעשות בכל ניתוב
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/products', productRouter);
app.use('/chains', chainRouter);

// 3. הרצת השרת
// ?? - null/undefined כמו || עבור
const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    // בפעם הראשונה שהשרת עולה
    console.log(`Server is running on http://localhost:${port}`);
});