const error = (err, req, res, next) => {
    // Log all errors
    console.error(err);

    // Set default error values
    err.message = err.message || "Internal Server Error Occurred";
    err.statusCode = err.statusCode || 500;

    // Return the response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = error;
