const { Router } = require("express");
const { editProfile, viewProfile, changePassword } = require("../controllers/profile");
const { userAuth } = require("../middlewares/auth");

const profileRouter = Router();
profileRouter.get("/view", userAuth, viewProfile);
profileRouter.patch("/edit", userAuth, editProfile);
profileRouter.patch("/password", userAuth, changePassword);

module.exports = profileRouter;
