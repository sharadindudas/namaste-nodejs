const UserModel = require("../models/user");

// Feed - Get all users
const feed = async (req, res) => {
  try {
    // Find all users
    const users = await UserModel.find({}).select("-password");

    // Return the response
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { feed };
