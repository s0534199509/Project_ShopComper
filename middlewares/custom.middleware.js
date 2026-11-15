
import { AppError } from '../utils/appErrors.js'; // ייבוא מחלקת AppError
//הרשאות לקליינט מסויים

//בדיקת הרשאות מנהך/משתמש

//log
export const printMsg = (req, res, next) => {
    console.log(`hello from custom middleware: ${req.method} ${req.url}`);
    next();
}

//בדיקת תקינות על הבאדי

export const validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        throw new AppError(
            'שגיאה בנתוני הבקשה',
            400,
            'Validation Error',
            error.details.map(err => err.message)
        );
    }

    req.body = value;
    next();
};




//חסימת האתר בשבתות



//טיפול בשגיאות :
// היחיד שמקבל 4 פרמטרים לטיפול בשגיאות
export const errorHandler = (err, req, res, next) => {
    const status = err.status ?? err.statusCode
        ?? (err.code === 11000 ? 409 : ['ValidationError', 'CastError'].includes(err.name) ? 400 : 500);
    const message = err instanceof AppError || status < 500
        ? err.message
        : 'Internal Server Error';
    const response = {
        error: {
            message,
            type: err.type ?? (status < 500 ? 'Request Error' : 'Server Error'),
        },
    };

    if (err.details) {
        response.error.details = err.details;
    }

    return res.status(status).json(response);
};

export const pathNotFound = (req, res, next) => {
    throw new AppError(`${req.url} ${req.method} is not found`, 404, 'Page Not Found');
};