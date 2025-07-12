const express = require("express");
const { register, login, getAllUser } = require("../controllers/userController");
const userRouter = express.Router();

// userRouter.post("/register", register);
// userRouter.post("/login", login);
userRouter.get("/", getAllUser);
module.exports = userRouter;