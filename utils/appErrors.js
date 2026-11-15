export class AppError extends Error {
    constructor(message, status = 500, type = "Server Error", details) {
        super(message);
        this.status = status;
        this.type = type;
        this.details = details;
    }
}