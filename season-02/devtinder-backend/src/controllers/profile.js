const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const { validateEditProfile, validateChangePassword } = require("../utils/validation");
const bcrypt = require("bcrypt");

// Get user
const viewProfile = AsyncHandler(async (req, res, next) => {
    // Get the user details
    const user = req.user;

    // Remove sensitive data
    user.password = undefined;

    // Return the response
    res.status(200).json({
        success: false,
        message: "Fetched user details successfully",
        data: user
    });
});

// Edit user
const editProfile = AsyncHandler(async (req, res, next) => {
    // Get logged in user from auth middleware
    const loggedInUser = req.user;

    // Validation of data
    validateEditProfile(req.body);

    // Update the fields for the user
    Object.keys(req.body).forEach((field) => (loggedInUser[field] = req.body[field]));
    await loggedInUser.save();

    // Remove sensitive data
    loggedInUser.password = undefined;

    // Return the response
    res.status(200).json({
        success: true,
        message: "Updated user profile successfully",
        data: loggedInUser
    });
});

// Change password
const changePassword = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const { oldPassword, newPassword } = req.body;

    // Validation of data
    validateChangePassword(req.body);

    // Get logged in user data
    const loggedInUser = req.user;

    // Validation of password
    const isValidPassword = await loggedInUser.validatePassword(oldPassword);
    if (!isValidPassword) {
        throw new ErrorHandler("Invalid Credentials", 403);
    }

    // Hash the password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    loggedInUser.password = hashedNewPassword;
    await loggedInUser.save({ validateBeforeSave: false });

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });
});

module.exports = { viewProfile, editProfile, changePassword };
