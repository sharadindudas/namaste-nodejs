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
      return res.status(409).send("User already exists, Please Login");
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

    // Return the response
    res.status(201).send("User added successfully");
  } catch (err) {
    res.status(400).send(err.message);
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
      return res.status(404).send("User does not exists", 404);
    }

    // Compare password
    const isValidPassword = await userExists.validatePassword(password);
    if (!isValidPassword) {
      return res.status(403).send("Invalid Credentials");
    }

    // Create a jwt token
    const token = userExists.generateJwt();

    // Send the cookie along with the response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .send("Login successful !!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { signup, login };
