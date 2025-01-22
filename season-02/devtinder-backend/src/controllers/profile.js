const UserModel = require("../models/user");

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

// Update user details
const updateprofile = async (req, res) => {
  try {
    // Get data from request body
    const userdata = req.body;
    // Get the user id from request params
    const userid = req.params?.id;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
      return res.status(404).send("User does not exists");
    }

    // Validation of data
    const ALLOWED_FIELDS = ["age", "gender", "skills", "about", "photoUrl"];
    const isAllowed = Object.keys(userdata).every((field) =>
      ALLOWED_FIELDS.includes(field)
    );
    if (!isAllowed) {
      return res.status(400).send("Update not allowed");
    }

    if (userdata?.skills.length > 10) {
      return res.status(400).send("Skills cannot be more than 10");
    }

    //  Update the user
    await UserModel.findByIdAndUpdate(userid, userdata, {
      returnDocument: "after",
      runValidators: true,
    });

    // Return the response
    res.status(200).send("User updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { viewprofile, updateprofile };
