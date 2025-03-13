const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const UserModel = require("../models/user");
const { validateSignup, validateLogin } = require("../utils/validations");

// Signup
const Signup = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const { name, email, password } = req.body;

    // Validation of data
    validateSignup(req.body);

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        throw new ErrorHandler("User already exists, Please Login", 409);
    }

    // Create a new user
    const newUser = await UserModel.create({
        name,
        email,
        password
    });

    // Remove sensitive data
    newUser.password = undefined;

    // Return the response
    res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: newUser
    });
});

// Login
const Login = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const { email, password } = req.body;

    // Validation of data
    validateLogin(req.body);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Validate the password
    const isValidPassword = await userExists.validatePassword(password);
    if (!isValidPassword) {
        throw new ErrorHandler("Invalid Credentials", 401);
    }

    // Generate jwt token
    const token = userExists.generateJwt();

    // Remove sensitive data
    userExists.password = undefined;

    // Set the cookie and return the response
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "strict"
    })
        .status(200)
        .json({
            success: true,
            message: "Logged in successfully",
            data: userExists
        });
});

// Logout
const Logout = (req, res) => {
    // Remove the cookie and return the response
    res.clearCookie("token").status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = { Signup, Login, Logout };
