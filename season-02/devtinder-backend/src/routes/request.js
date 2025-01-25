const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendconnectionrequest } = require("../controllers/request");

const requestRouter = Router();

requestRouter.post("/send/:status/:userId", userAuth, sendconnectionrequest);

module.exports = requestRouter;
