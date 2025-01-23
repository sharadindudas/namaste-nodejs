const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  viewprofile,
  editprofile,
  changepassword,
} = require("../controllers/profile");

const profileRouter = Router();

profileRouter.get("/view", userAuth, viewprofile);
profileRouter.patch("/edit", userAuth, editprofile);
profileRouter.patch("/password", userAuth, changepassword);

module.exports = profileRouter;
