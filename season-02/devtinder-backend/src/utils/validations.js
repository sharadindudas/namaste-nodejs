const validator = require("validator");
const { ErrorHandler } = require("./handlers");

const validateSignup = (data) => {
    const { name, email, password } = data;

    if (name.length === 0) {
        throw new ErrorHandler("Please provide a name", 400);
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
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
            400
        );
    }
};

const validateLogin = (data) => {
    const { email, password } = data;

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
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
            400
        );
    }
};

const validateEditProfile = (data) => {
    const allowedFields = ["name", "age", "gender", "about", "skills"];

    const isAllowed = Object.keys(data).every((field) => allowedFields.includes(field));
    if (!isAllowed) {
        throw new ErrorHandler("Please provide the proper fields", 400);
    }

    if (data?.skills?.length > 5) {
        throw new ErrorHandler("Skills must not be more than 5", 400);
    }
};

const validateChangePassword = (data) => {
    const { newPassword } = data;

    if (
        !validator.isStrongPassword(newPassword, {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
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

const validateSendConnectionRequest = (data) => {
    const { status } = data;
    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
        throw new ErrorHandler("Please provide a valid status", 400);
    }
};

const validateReviewConnectionRequest = (data) => {
    const { status } = data;
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
        throw new ErrorHandler("Please provide a valid status", 400);
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
