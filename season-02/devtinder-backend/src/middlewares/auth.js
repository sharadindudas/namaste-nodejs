const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const jwt = require("jsonwebtoken");

const userAuth = AsyncHandler(async (req, res, next) => {
    // Get the token
    const { token } = req.cookies;

    // Validation of token
    if (!token) {
        throw new ErrorHandler("Please login to continue", 401);
    }

    // Decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user details
    const user = await UserModel.findById(decodedToken._id);
    if (!user) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Pass the user inside request object
    req.user = user;

    // Move to next handler function
    next();
});

module.exports = { userAuth };
