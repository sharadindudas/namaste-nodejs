const errorMiddleware = (err, req, res, next) => {
    // Log all the errors
    console.error(err);

    // Set all the default values for error
    err.message ||= "Internal Server Error Occurred";
    err.statusCode ||= 500;

    // Return the response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = errorMiddleware;
