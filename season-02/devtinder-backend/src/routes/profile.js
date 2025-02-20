const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { userProfile, editProfile, changePassword } = require("../controllers/profile");

const profileRouter = Router();

profileRouter.get("/view", userAuth, userProfile);
profileRouter.patch("/edit", userAuth, editProfile);
profileRouter.patch("/password", userAuth, changePassword);

module.exports = profileRouter;
