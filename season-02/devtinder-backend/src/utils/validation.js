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

// Edit profile validation
const validateEditProfile = (body) => {
  // Set the fields to be allowed for edit
  const allowedFieldsToEdit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "about",
  ];

  // Validation of data
  const isAllowed = Object.keys(body).every((field) =>
    allowedFieldsToEdit.includes(field)
  );
  if (!isAllowed) {
    throw new Error("Please provide proper fields to edit");
  }

  // Check if skills is less than 10
  if (body?.skills.length > 10) {
    throw new Error("Skills must not exceed 10");
  }
};

module.exports = { validateSignup, validateLogin, validateEditProfile };
