const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../utils/handlers");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            min: [6, "Name must be at least 6 characters"],
            max: [100, "Name must not exceed 100 characters"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: [true, "User already exists"],
            lowercase: true,
            trim: true,
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
                if (
                    !validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 1
                    })
                ) {
                    throw new ErrorHandler(
                        "Password must be at least 8 characters long and includes at least one uppercase character, one lowercase character, one number and one symbol",
                        400
                    );
                }
            }
        },
        gender: {
            type: String,
            enum: {
                values: ["Male", "Female"],
                message: "Please provide a valid gender type"
            },
            trim: true
        },
        age: {
            type: Number,
            min: [18, "You must be at least 18 years old"]
        },
        about: {
            type: String,
            trim: true,
            default: "This is the about section"
        },
        skills: {
            type: [String],
            trim: true
        },
        photoUrl: {
            type: String,
            trim: true,
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
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            issuer: "devtinder",
            expiresIn: "7d"
        }
    );
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
