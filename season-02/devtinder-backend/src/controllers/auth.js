const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const { validateSignup, validateLogin } = require("../utils/validation");
const bcrypt = require("bcrypt");

// Signup
const signup = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const { firstName, lastName, email, password } = req.body;

    // Validation of data
    validateSignup(req.body);

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        throw new ErrorHandler("User already exists, Please Login", 409);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    await newUser.save();

    // Remove sensitive data
    newUser.password = undefined;

    // Return the response
    res.status(201).json({
        success: true,
        message: "User registered successfully",
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
    const token = userExists.generateJwt();

    // Remove sensitive data
    userExists.password = undefined;

    // Set the cookie and return the response
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    })
        .status(200)
        .json({
            success: true,
            message: "User logged in successfully",
            data: userExists
        });
});

// Logout
const logout = (req, res) => {
    // Remove the cookies and return the response
    res.clearCookie("token").status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = { signup, login, logout };
