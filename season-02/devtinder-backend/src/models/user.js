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
            lowercase: true,
            unique: true,
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
                if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
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
                values: ["male", "female"],
                message: `{VALUE} is not a valid gender type`
            },
            trim: true
        },
        age: {
            type: Number,
            min: [18, "You must be at least 18 years old"]
        },
        about: {
            type: String,
            trim: true
        },
        skills: {
            type: [String],
            trim: true
        },
        photoUrl: {
            type: String,
            default: "https://api.dicebear.com/9.x/pixel-art/svg",
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
    // If the password is changed
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
userSchema.methods.generateJwt = async function (password) {
    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    return token;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
