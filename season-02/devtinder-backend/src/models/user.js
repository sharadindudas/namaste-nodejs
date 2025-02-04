const mongoose = require("mongoose");
const validator = require("validator");
const { ErrorHandler } = require("../utils/handlers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please provide an email address"],
            trim: true,
            unique: [true, "User already exists"],
            validate: function (value) {
                if (!validator.isEmail(value)) {
                    throw new ErrorHandler("Please provide a valid email address", 400);
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
                        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol",
                        400
                    );
                }
            }
        },
        age: {
            type: Number,
            min: [18, "You must be at last 18 years old"]
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: "Please provide a valid gender type"
            },
            trim: true
        },
        about: {
            type: String,
            trim: true,
            default: "This is about section"
        },
        skills: {
            type: [String],
            trim: true
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
    { timestamps: true, versionKey: false }
);

// Hash the password
userSchema.pre("save", async function (next) {
    // Check if the password is modified or not
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Validate the password
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate jwt token
userSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
    return token;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
