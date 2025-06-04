const express = require("express");
const ClassRouter = express.Router();
const ClassController = require("../controllers/Class.controller");

ClassRouter.get("/", ClassController.getAllClasses);
ClassRouter.get("/:id", ClassController.getClassById);
ClassRouter.post("/", ClassController.createClass);
ClassRouter.put("/:id", ClassController.updateClass);
ClassRouter.delete("/:id", ClassController.deleteClass);

module.exports = ClassRouter;
