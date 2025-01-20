const mongoose = require("mongoose");
const validator = require("validator");

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
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gm,
        "Password must be at least 8 characters, includes at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
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
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
