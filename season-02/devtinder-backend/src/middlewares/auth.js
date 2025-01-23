const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Get the token from request cookies
    const { token } = req.cookies;

    // Validation of token
    if (!token) {
      throw new Error("Please Login to continue");
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).send("User does not exists");
    }

    // Pass the user inside request
    req.user = user;

    // Move to next handler function
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { userAuth };
