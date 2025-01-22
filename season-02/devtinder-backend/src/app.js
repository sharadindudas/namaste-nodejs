const express = require("express");
const connectMongoDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/profile", profileRouter)

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
