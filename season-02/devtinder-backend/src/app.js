const express = require("express");
const connectMongoDB = require("./config/database");
const UserModel = require("./models/user");

const app = express();
const PORT = process.env.PORT;

// Signup
app.post("/signup", async (req, res) => {
  try {
    // Create a new instance of the user
    const newuser = new UserModel({
      firstName: "Sharadindu",
      lastName: "Das",
      email: "abc@gmail.com",
      password: "password",
    });

    // Saving the user
    await newuser.save();

    // Return the response
    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(500).send("Error while signing up the user");
  }
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
