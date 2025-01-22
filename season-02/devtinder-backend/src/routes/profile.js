const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewprofile, updateprofile } = require("../controllers/profile");

const profileRouter = Router();

profileRouter.get("/view", userAuth, viewprofile);
profileRouter.patch("/edit", userAuth, updateprofile);

module.exports = profileRouter;
