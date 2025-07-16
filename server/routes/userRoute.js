const express = require("express");
const {
  register,
  login,
  getAllUser,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const userRouter = express.Router();

const authAdmin = require("../middlewares/authAdmin");

userRouter.post("/register", authAdmin, register);
userRouter.post("/login", login);
userRouter.put("/:id", authAdmin, updateUserById);
userRouter.get("/:id", authAdmin, getUserById);
userRouter.get("/", authAdmin, getAllUser);
module.exports = userRouter;
