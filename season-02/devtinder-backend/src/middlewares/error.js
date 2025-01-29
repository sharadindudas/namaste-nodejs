const error = (err, req, res, next) => {
    // Log all the errors
    console.error(err);

    // Set default error message and status code
    err.message ||= "Internal Server Error Occurred";
    err.statusCode ||= 500;

    // Return the response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = error;
