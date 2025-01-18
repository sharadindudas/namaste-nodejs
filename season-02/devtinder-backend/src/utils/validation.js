const validator = require("validator");

// Signup validation
const validateSignup = (body, res) => {
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName) {
    return res.status(400).send("Please provide a name");
  } else if (!validator.isEmail(email)) {
    return res.status(400).send("Please provide a valid email");
  } else if (!validator.isStrongPassword(password)) {
    return res.status(400).send("Please provide a strong password");
  }
};

// Login validation
const validateLogin = (body, res) => {
  const { email, password } = body;

  if (!validator.isEmail(email)) {
    return res.status(400).send("Please provide a valid email");
  } else if (!validator.isStrongPassword(password)) {
    return res.status(400).send("Please provide a strong password");
  }
};

module.exports = { validateSignup, validateLogin };
