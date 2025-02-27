const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest, reviewConnectionRequest } = require("../controllers/request");

const requestRouter = Router();
requestRouter.post("/send/:status/:userId", userAuth, sendConnectionRequest);
requestRouter.post("/review/:status/:requestId", userAuth, reviewConnectionRequest);

module.exports = requestRouter;
