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

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/:id", updateUserById);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUser);
module.exports = userRouter;
