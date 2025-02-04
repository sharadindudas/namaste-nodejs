const notfound = (req, res, next) => {
    // Return the response
    res.status(404).json({
        success: false,
        message: "Oops! Can't find the route"
    });
};

module.exports = notfound;
