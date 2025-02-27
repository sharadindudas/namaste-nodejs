const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const jwt = require("jsonwebtoken");

const userAuth = AsyncHandler(async (req, res, next) => {
    // Get the token
    const { token } = req.cookies;

    // Validation of token
    if (!token) {
        throw new ErrorHandler("Please Login to continue", 401);
    }

    // Decode the token
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // Get user details
    const user = await UserModel.findById(decodedPayload._id);
    if (!user) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Pass the user data inside request object
    req.user = user;

    // Move to next handler function
    next();
});

module.exports = { userAuth };
