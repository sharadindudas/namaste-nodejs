const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewprofile, editprofile } = require("../controllers/profile");

const profileRouter = Router();

profileRouter.get("/view", userAuth, viewprofile);
profileRouter.patch("/edit", userAuth, editprofile);

module.exports = profileRouter;
