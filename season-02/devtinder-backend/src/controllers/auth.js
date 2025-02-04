const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const { validateSignup, validateLogin } = require("../utils/validations");

// Signup
const signup = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const { name, email, password } = req.body;

    // Validation of data
    validateSignup(req.body);

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        throw new ErrorHandler("User already exists", 409);
    }

    // Save the user in db
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
const login = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const { email, password } = req.body;

    // Validation of data
    validateLogin(req.body);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Validation of password
    const isValidPassword = await userExists.validatePassword(password);
    if (!isValidPassword) {
        throw new ErrorHandler("Invalid Credentials", 403);
    }

    // Generate jwt token
    const token = userExists.generateJWT();

    // Remove sensitive data
    userExists.password = undefined;

    // Set the token to cookie and return the response
    res.cookie("devtinderToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
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
const logout = AsyncHandler(async (req, res, next) => {
    res.clearCookie("devtinderToken").status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

module.exports = { signup, login, logout };
