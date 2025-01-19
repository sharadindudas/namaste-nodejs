const express = require("express");
const connectMongoDB = require("./config/database");
const UserModel = require("./models/user");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Signup
app.post("/signup", async (req, res) => {
  try {
    // Get data from request body
    const userdata = req.body;

    // Create a new instance of the user
    const newuser = new UserModel(userdata);

    // Saving the user
    await newuser.save();

    // Return the response
    res.status(201).send("User added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get user details
app.get("/user", async (req, res) => {
  try {
    // Get email from request body
    const { email } = req.body;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      res.status(404).send("User does not exists");
    } else {
      res.status(200).send(userExists);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Feed api - get all users
app.get("/feed", async (req, res) => {
  try {
    // Find all users
    const users = await UserModel.find({});

    // Return the response
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Internal Server Error occurred");
  }
});

// Delete a user
app.delete("/user", async (req, res) => {
  try {
    // Get the user id from request body
    const { userid } = req.body;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
      res.status(404).send("User does not exists");
    }

    // Delete the user from the db
    const deleteduser = await UserModel.findByIdAndDelete(userid);
    console.log(deleteduser);

    // Return the response
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error occurred");
  }
});

// Update a user
app.patch("/user", async (req, res) => {
  // Get the user id from request body
  const { userid } = req.body;

  // Check if the user exists in the db or not
  const userExists = await UserModel.findById(userid);
  if (!userExists) {
    res.status(404).send("User does not exists");
  }

  //  Update the user
  await UserModel.findByIdAndUpdate(userid, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  // Return the response
  res.status(200).send("User updated successfully");
});

// Connection to database
connectMongoDB()
  .then(() => {
    console.log("MongoDB is connected successfully");

    // Connection to server
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
