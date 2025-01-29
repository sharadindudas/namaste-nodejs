const { ErrorHandler } = require("./handlers");
const validator = require("validator");

const validateSignup = (body) => {
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName) {
        throw new ErrorHandler("Please provide a name", 400);
    }

    if (!validator.isEmail(email)) {
        throw new ErrorHandler("Please provide a valid email", 400);
    }

    if (
        !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    ) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
            400
        );
    }
};

const validateLogin = (body) => {
    const { email, password } = body;

    if (!validator.isEmail(email)) {
        throw new ErrorHandler("Please provide a valid email", 400);
    }

    if (
        !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    ) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
            400
        );
    }
};

const validateEditProfile = (body) => {
    // Set the fields allowed to be edited
    const allowedFieldsToEdit = ["firstName", "lastName", "age", "gender", "skills", "about"];

    // Check if all the fields are allowed or not
    const isAllowed = Object.keys(body).every((field) => allowedFieldsToEdit.includes(field));
    if (!isAllowed) {
        throw new ErrorHandler("Please provide the proper fields", 400);
    }

    // Validation of skills
    if (body?.skills.length > 5) {
        throw new ErrorHandler("Skills cannot be more than 5", 400);
    }
};

const validateChangePassword = (body) => {
    const { newPassword } = body;

    if (
        !validator.isStrongPassword(newPassword, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    ) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
            400
        );
    }
};

const validateSendConnectionRequest = (params) => {
    const { status } = params;

    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
        throw new ErrorHandler(`Please provide a valid status type`, 400);
    }
};

const validateReviewConnectionRequest = (params) => {
    const { status } = params;

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
        throw new ErrorHandler(`Please provide a valid status type`, 400);
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
