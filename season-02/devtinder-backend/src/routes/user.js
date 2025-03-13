const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { receivedConnectionRequests, allConnectionRequests, usersFeed } = require("../controllers/user");

const userRouter = Router();
userRouter.get("/requests/received", userAuth, receivedConnectionRequests);
userRouter.get("/connections", userAuth, allConnectionRequests);
userRouter.get("/feed", userAuth, usersFeed);

module.exports = userRouter;
