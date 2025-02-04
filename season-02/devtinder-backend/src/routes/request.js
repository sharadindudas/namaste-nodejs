const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest, reviewConnectionRequest } = require("../controllers/request");

const requestRouter = Router();

requestRouter.use(userAuth);
requestRouter.post("/send/:status/:userId", sendConnectionRequest);
requestRouter.post("/review/:status/:requestId", reviewConnectionRequest);

module.exports = requestRouter;
