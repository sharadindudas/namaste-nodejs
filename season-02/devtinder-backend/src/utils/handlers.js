// Error handler
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Async await handler
const AsyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = { AsyncHandler, ErrorHandler };
