const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const { validateEditProfile, validateChangePassword } = require("../utils/validations");

// View user profile
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

// Edit user profile
const editProfile = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Validation of data
    validateEditProfile(req.body);

    // Update the user data
    Object.keys(req.body).forEach((field) => (loggedInUser[field] = req.body[field]));
    await loggedInUser.save();

    // Remove sensitive data
    loggedInUser.password = undefined;

    // Return the response
    res.status(200).json({
        success: true,
        message: "Updated user successfully",
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

    // Update the password
    loggedInUser.password = newPassword;
    await loggedInUser.save({ validateBeforeSave: false });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Updated password successfully"
    });
});

module.exports = { viewProfile, editProfile, changePassword };
