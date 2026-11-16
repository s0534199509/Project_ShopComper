export class AppError extends Error {
    constructor(message, statusCode, type, details) {
        super(message);
        this.name = 'AppError';
        this.status = statusCode;
        this.statusCode = statusCode;
        this.type = type;
        this.details = details;
    }
}