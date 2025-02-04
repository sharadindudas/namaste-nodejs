const { Router } = require("express");
const { viewProfile, editProfile, changePassword } = require("../controllers/profile");
const { userAuth } = require("../middlewares/auth");

const profileRouter = Router();

profileRouter.use(userAuth);
profileRouter.get("/view", viewProfile);
profileRouter.patch("/edit", editProfile);
profileRouter.patch("/password", changePassword);

module.exports = profileRouter;
