const { validateSignup, validateLogin } = require("../utils/validation");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

// Signup
const signup = async (req, res) => {
  try {
    // Get data from request body
    const { firstName, lastName, email, password } = req.body;

    // Validation of data
    validateSignup(req.body);

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists, Please Login",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instance of the user
    const newuser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Saving the user
    await newuser.save();

    // Remove sensitive data
    newuser.password = undefined;

    // Return the response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newuser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    // Get data from request body
    const { email, password } = req.body;

    // Validation of data
    validateLogin(req.body);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    // Compare password
    const isValidPassword = await userExists.validatePassword(password);
    if (!isValidPassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Create a jwt token
    const token = userExists.generateJwt();

    // Remove sensitive data
    userExists.password = undefined;

    // Send the cookie along with the response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        data: userExists,
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Logout
const logout = async (req, res) => {
  // Clear the cookie and return the response
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { signup, login, logout };
