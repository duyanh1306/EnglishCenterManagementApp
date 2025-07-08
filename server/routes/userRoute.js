const express = require("express");
const { register, login, getAllUser } = require("../controllers/userController");
const userRouter = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", jwtAuth, authAdmin, getAllUser);
module.exports = userRouter;