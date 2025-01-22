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

module.exports = { viewprofile };
