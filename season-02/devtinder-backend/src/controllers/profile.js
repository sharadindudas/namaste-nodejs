const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const { validateEditProfile, validateChangePassword } = require("../utils/validations");

// View user
const viewProfile = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Remove sensitive data
    loggedInUser.password = undefined;

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched user profile successfully",
        data: loggedInUser
    });
});

// Edit user
const editProfile = AsyncHandler(async (req, res, next) => {
    // Get data from request body
    const bodyData = req.body;

    // Get logged in user data
    const loggedInUser = req.user;

    // Validation of data
    validateEditProfile(bodyData);

    // Update the fields and save it on db
    Object.keys(bodyData).forEach((field) => (loggedInUser[field] = bodyData[field]));
    await loggedInUser.save();

    // Remove sensitive data
    loggedInUser.password = undefined;

    // Return the response
    res.status(200).json({
        success: true,
        message: "Updated profile successfully"
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
        throw new ErrorHandler("Invalid Credentials", 401);
    }

    // Update the password and save it on db
    loggedInUser.password = newPassword;
    await loggedInUser.save({ validateBeforeSave: false });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Updated password successfully"
    });
});

module.exports = { viewProfile, editProfile, changePassword };
