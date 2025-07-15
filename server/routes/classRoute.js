const express = require("express");
const classRouter = express.Router();
const  authAdmin  = require("../middlewares/authAdmin");
const {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

classRouter.get("/", getAllClasses);
classRouter.post("/add", createClass);
classRouter.put("/update/:id",  updateClass);
classRouter.delete("/delete/:id", deleteClass);

module.exports = classRouter;
