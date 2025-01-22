const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewprofile } = require("../controllers/profile");

const profileRouter = Router();

profileRouter.get("/view", userAuth, viewprofile);

module.exports = profileRouter;
