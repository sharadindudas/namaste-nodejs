const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewProfile, editProfile, changePassword } = require("../controllers/profile");

const profileRouter = Router();
profileRouter.get("/view", userAuth, viewProfile);
profileRouter.patch("/edit", userAuth, editProfile);
profileRouter.patch("/password", userAuth, changePassword);

module.exports = profileRouter;
