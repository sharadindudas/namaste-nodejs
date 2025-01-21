const validator = require("validator");

// Signup validation
const validateSignup = (body) => {
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName) {
    throw new Error("Please provide a name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a strong password");
  }
};

// Login validation
const validateLogin = (body) => {
  const { email, password } = body;

  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a strong password");
  }
};

module.exports = { validateSignup, validateLogin };
