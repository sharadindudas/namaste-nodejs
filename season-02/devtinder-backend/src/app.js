const express = require("express");
const connectMongoDB = require("./config/database");

const app = express();
const PORT = 7777;

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
