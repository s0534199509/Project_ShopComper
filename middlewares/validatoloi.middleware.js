import { AppError } from '../utils/appErrors.js';

export const validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return next(new AppError(
            'Invalid request data',
            400,
            'Validation Error',
            error.details.map(err => err.message)
        ));
    }

    req.body = value;
    next();
};
