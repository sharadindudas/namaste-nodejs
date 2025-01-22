const { validateEditProfile } = require("../utils/validation");

// Get user details
const viewprofile = async (req, res) => {
  try {
    // Get the user from auth middleware
    const user = req.user;

    // Return the response
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Edit user details
const editprofile = async (req, res) => {
  try {
    // Validation of data
    validateEditProfile(req.body);

    // Get the user data
    const user = req.user;

    // Update the user details
    Object.keys(req.body).forEach((field) => (user[field] = req.body[field]));
    await user.save();

    // Return the response
    res.status(200).send("Profile updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { viewprofile, editprofile };
