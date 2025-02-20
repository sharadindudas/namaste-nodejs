const { Router } = require("express");
const { Signup, Login, Logout } = require("../controllers/auth");

const authRouter = Router();

authRouter.post("/signup", Signup);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);

module.exports = authRouter;
