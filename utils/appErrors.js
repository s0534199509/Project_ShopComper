export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        // כאן מעבירים את השגיאה הלאה ל-errorHandler המרכזי בעזרת next()
        next(error);
    }
};