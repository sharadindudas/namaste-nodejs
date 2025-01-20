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
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists, Please Login");
    }

    // Create a new instance of the user
    const newuser = new UserModel({ firstName, lastName, email, password });

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
    const userExists = await UserModel.findOne({ email }).select("-password");
    if (!userExists) {
      return res.status(404).send("User does not exists");
    }

    // Return the response
    res.status(200).send(userExists);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Feed api - get all users
app.get("/feed", async (req, res) => {
  try {
    // Find all users
    const users = await UserModel.find({}).select("-password");

    // Return the response
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
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
      return res.status(404).send("User does not exists");
    }

    // Delete the user from the db
    await UserModel.findByIdAndDelete(userid);

    // Return the response
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a user
app.patch("/user/:id", async (req, res) => {
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
    res.status(500).send(err.message);
  }
});

// Connection to database
connectMongoDB()
  .then(() => {
    console.log("MongoDB is connected successfully");

    // Connection to server
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
