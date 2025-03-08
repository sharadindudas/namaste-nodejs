const { Router } = require("express");
const { getUserProfile, editUserProfile, changePassword } = require("../controllers/profile");
const { userAuth } = require("../middlewares/auth");

const profileRouter = Router();
profileRouter.get("/view", userAuth, getUserProfile);
profileRouter.patch("/edit", userAuth, editUserProfile);
profileRouter.patch("/password", userAuth, changePassword);

module.exports = profileRouter;
