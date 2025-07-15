const express = require("express");
const {
  register,
  login,
  getAllUser,
  // getUserById,
  // updateUserById,
} = require("../controllers/userController");
const userRouter = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

userRouter.post("/register", register);
userRouter.post("/login", login);
// userRouter.put("/:id", updateUserById); // jwtAuth, authAdmin,
// userRouter.get("/:id", getUserById); // jwtAuth, authAdmin,
userRouter.get("/", getAllUser); // jwtAuth, authAdmin,

module.exports = userRouter;
