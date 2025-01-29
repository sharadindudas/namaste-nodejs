const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const jwt = require("jsonwebtoken");

const userAuth = AsyncHandler(async (req, res, next) => {
    // Validation of token
    const { token } = req.cookies;
    if (!token) {
        throw new ErrorHandler("Please login to continue", 400);
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user details
    const user = await UserModel.findById(decoded._id);
    if (!user) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Add the user data inside request
    req.user = user

    // Move to next handler function
    next()
});

module.exports = { userAuth };
