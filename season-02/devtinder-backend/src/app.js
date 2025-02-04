const express = require("express");
const cookieParser = require("cookie-parser");
const error = require("./middlewares/error");
const notfound = require("./middlewares/notfound");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);

// Error and not found middlewares
app.use(error);
app.use("*", notfound);

module.exports = app;
