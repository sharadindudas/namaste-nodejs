const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  sendconnectionrequest,
  reviewconnectionrequest,
} = require("../controllers/request");

const requestRouter = Router();

requestRouter.post("/send/:status/:userId", userAuth, sendconnectionrequest);
requestRouter.post(
  "/review/:status/:requestId",
  userAuth,
  reviewconnectionrequest
);

module.exports = requestRouter;
