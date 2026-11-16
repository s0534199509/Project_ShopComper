import { AppError } from '../utils/appErrors.js';

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

export const pathNotFound = (req, res, next) => {
    next(new AppError(`${req.url} ${req.method} is not found`, 404, 'Page Not Found'));
};
