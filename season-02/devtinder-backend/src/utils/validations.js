const { ErrorHandler } = require("./handlers");
const validator = require("validator");

// Signup validation
const validateSignup = (data) => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new ErrorHandler("Please provide the name, email and password", 400);
    }

    if (!validator.isEmail(email)) {
        throw new ErrorHandler("Please provide a valid email", 400);
    }

    if (
        !validator.isStrongPassword(password, {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    ) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long and includes at least one uppercase character, one lowercase character, one number and one symbol",
            400
        );
    }
};

// Login validation
const validateLogin = (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new ErrorHandler("Please provide the email and password", 400);
    }

    if (!validator.isEmail(email)) {
        throw new ErrorHandler("Please provide a valid email", 400);
    }

    if (
        !validator.isStrongPassword(password, {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    ) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long and includes at least one uppercase character, one lowercase character, one number and one symbol",
            400
        );
    }
};

// Edit profile validation
const validateEditProfile = (data) => {
    const fieldsAllowedToEdit = ["age", "about", "skills"];

    const isEditAllowed = Object.keys(data).every((field) => fieldsAllowedToEdit.includes(field));
    if (!isEditAllowed) {
        throw new ErrorHandler("Please provide the valid fields to update", 400);
    }

    if (data?.skills?.length > 5) {
        throw new ErrorHandler("Skills cannot be more than 5", 400);
    }
};

// Change password validation
const validateChangePassword = (data) => {
    const { oldPassword, newPassword } = data;

    if (!oldPassword || !newPassword) {
        throw new ErrorHandler("Please provide the old and new password", 400);
    }

    if (!validator.isStrongPassword(newPassword, { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long and includes at least one uppercase character, one lowercase character, one number and one symbol",
            400
        );
    }
};

// Send connection request validation
const validateSendConnectionRequest = (data) => {
    const { status } = data;

    const allowedStatusValues = ["interested", "ignored"];

    if (!allowedStatusValues.includes(status)) {
        throw new ErrorHandler(`Invalid status type: "${status}"`, 400);
    }
};

// Review connection request validation
const validateReviewConnectionRequest = (data) => {
    const { status } = data;

    const allowedStatusValues = ["accepted", "rejected"];
    if (!allowedStatusValues.includes(status)) {
        throw new ErrorHandler(`Invalid status type: "${status}"`, 400);
    }
};

module.exports = {
    validateSignup,
    validateLogin,
    validateEditProfile,
    validateChangePassword,
    validateSendConnectionRequest,
    validateReviewConnectionRequest
};
