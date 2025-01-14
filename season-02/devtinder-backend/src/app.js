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
    res.status(500).send("Internal Server Error occurred");
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
    res.status(500).send("Internal Server Error occurred");
  }
});

// Feed api - get all users
app.get("/feed", async (req, res) => {
  // Find all users
  const users = await UserModel.find({});

  // Return the response
  res.status(200).send(users);
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
