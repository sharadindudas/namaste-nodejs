const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
      trim: true,
      lowercase: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please provide a valid email");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please provide a password"],
      minLength: [8, "Password must be at least 8 characters"],
      maxLength: [100, "Password must not exceed 100 characters"],
      validate: function (value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please provide a strong password");
        }
      },
    },
    age: {
      type: Number,
      min: [18, "User must be at least 18 years old"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      trim: true,
    },
    skills: {
      type: [String],
      trim: true,
    },
    about: {
      type: String,
      trim: true,
      default: "This is a default about section",
    },
    photoUrl: {
      type: String,
      default: "https://api.dicebear.com/9.x/pixel-art/svg",
      validate: function (value) {
        if (!validator.isURL(value)) {
          throw new Error("Please provide a valid photo url");
        }
      },
    },
  },
  { timestamps: true, versionKey: false }
);

// Validation of password
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate a jwt token
userSchema.methods.generateJwt = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  return token;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
