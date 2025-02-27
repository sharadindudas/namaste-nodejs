const { Router } = require("express");
const { connectionRequestsReceived, getAllConnections, getAllUsersInFeed } = require("../controllers/user");
const { userAuth } = require("../middlewares/auth");

const userRouter = Router();
userRouter.get("/requests/received", userAuth, connectionRequestsReceived);
userRouter.get("/connections", userAuth, getAllConnections);
userRouter.get("/feed", userAuth, getAllUsersInFeed);

module.exports = userRouter;
