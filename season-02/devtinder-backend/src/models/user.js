const mongoose = require("mongoose");
const validator = require("validator");
const { ErrorHandler } = require("../utils/handlers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a full name"],
            min: [6, "Name must be at least 6 characters"],
            max: [100, "Name must not exceed 100 characters"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            trim: true,
            unique: [true, "User already exists"],
            lowercase: true,
            validate: function (value) {
                if (!validator.isEmail(value)) {
                    throw new ErrorHandler("Please provide a valid email", 400);
                }
            }
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            trim: true,
            validate: function (value) {
                if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                    throw new ErrorHandler(
                        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number and one symbol",
                        400
                    );
                }
            }
        },
        age: {
            type: Number,
            min: [18, "You must be at least 18 years old"]
        },
        gender: {
            type: String,
            trim: true,
            enum: {
                values: ["male", "female"],
                message: "Please provide a valid gender type"
            }
        },
        about: {
            type: String,
            trim: true,
            default: "This is the about section"
        },
        skills: {
            type: [String]
        },
        photoUrl: {
            type: String,
            default: "https://api.dicebear.com/9.x/pixel-art/svg",
            validate: function (value) {
                if (!validator.isURL(value)) {
                    throw new ErrorHandler("Please provide a valid photo url", 400);
                }
            }
        }
    },
    { timestamps: true }
);

// Hash the password
userSchema.pre("save", async function (next) {
    // If the password is changed
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Validation of password
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate jwt token
userSchema.methods.generateJwt = function () {
    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            issuer: "Devtinder",
            expiresIn: process.env.JWT_EXPIRY
        }
    );
    return token;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
