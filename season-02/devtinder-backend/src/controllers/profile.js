const { validateEditProfile } = require("../utils/validation");

// Get user details
const viewprofile = async (req, res) => {
  try {
    // Get the user from auth middleware
    const user = req.user;

    // Return the response
    res.status(200).json({
      success: true,
      message: "Fetched user successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Edit user details
const editprofile = async (req, res) => {
  try {
    // Validation of data
    validateEditProfile(req.body);

    // Get the logged in user data
    const loggedInUser = req.user;

    // Update the user data in db
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save({ validateBeforeSave: false });

    // Return the response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { viewprofile, editprofile };
