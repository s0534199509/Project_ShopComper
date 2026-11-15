import { AppError } from '../utils/appErrors.js';

// לוג פשוט לבדיקה
export const printMsg = (req, res, next) => {
    console.log(`hello from custom middleware: ${req.method} ${req.url}`);
    next();
};

// בדיקת תקינות על ה-Body באמצעות Joi
export const validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return next(new AppError(
            'שגיאה בנתוני הבקשה',
            400,
            'Validation Error',
            error.details.map(err => err.message)
        ));
    }

    req.body = value;
    next();
};

// טיפול מרכזי בשגיאות (חובה 4 פרמטרים: err, req, res, next)
export const errorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const type = err.type || 'Server Error';

    const response = {
        error: {
            message,
            type,
        },
    };

    if (err.details) {
        response.error.details = err.details;
    }

    return res.status(status).json(response);
};

// טיפול בנתיב שלא נמצא (404)
export const pathNotFound = (req, res, next) => {
    next(new AppError(`${req.url} ${req.method} is not found`, 404, 'Page Not Found'));
};