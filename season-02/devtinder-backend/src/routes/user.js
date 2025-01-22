const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { feed } = require("../controllers/user");

const userRouter = Router();

userRouter.get("/feed", userAuth, feed);

module.exports = userRouter;
