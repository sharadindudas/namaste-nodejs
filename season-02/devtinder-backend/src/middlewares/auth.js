const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const jwt = require("jsonwebtoken");

const userAuth = AsyncHandler(async (req, res, next) => {
    // Get token from request cookies
    const { devtinderToken } = req.cookies;

    // Validation of token
    if (!devtinderToken) {
        throw new ErrorHandler("Please login to continue", 403);
    }

    // Decode the payload
    const decodedPayload = jwt.verify(devtinderToken, process.env.JWT_SECRET);

    // Get user details
    const user = await UserModel.findById(decodedPayload._id);
    if (!user) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Pass the user data inside request
    req.user = user;

    // Move to next handler function
    next();
});

module.exports = { userAuth };
