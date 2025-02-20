const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestsReceived, getAllConnections } = require("../controllers/user");

const userRouter = Router();

userRouter.get("/requests/received", userAuth, connectionRequestsReceived);
userRouter.get("/connections", userAuth, getAllConnections);

module.exports = userRouter;
