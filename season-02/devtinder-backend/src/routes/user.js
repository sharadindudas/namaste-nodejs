const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { getAllRequestsReceived, getAllConnections, getUsersInFeed } = require("../controllers/user");

const userRouter = Router();
userRouter.get("/requests/received", userAuth, getAllRequestsReceived);
userRouter.get("/connections", userAuth, getAllConnections);
userRouter.get("/feed", userAuth, getUsersInFeed);

module.exports = userRouter;
