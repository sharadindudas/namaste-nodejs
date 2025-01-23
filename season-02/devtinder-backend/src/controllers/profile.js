const { validateEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Get user details
const viewprofile = async (req, res) => {
  try {
    // Get the user from auth middleware
    const loggedInUser = req.user;

    // Remove sensitive data
    loggedInUser.password = undefined;

    // Return the response
    res.status(200).json({
      success: true,
      message: "Fetched user successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Edit user details
const editprofile = async (req, res) => {
  try {
    // Validation of data
    validateEditProfile(req.body);

    // Get the logged in user data
    const loggedInUser = req.user;

    // Update the user data in db
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save({ validateBeforeSave: false });

    // Remove sensitive data
    loggedInUser.password = undefined;

    // Return the response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Change password
const changepassword = async (req, res) => {
  try {
    // Get data from request body
    const { oldPassword, newPassword } = req.body;

    // Get the logged in user data
    const loggedInUser = req.user;

    // Validation of password
    const isValidPassword = await loggedInUser.validatePassword(oldPassword);
    if (!isValidPassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Validation of new password
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Please provide a strong password");
    }

    // Hash the password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save({ validateBeforeSave: false });

    // Return the response
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { viewprofile, editprofile, changepassword };
