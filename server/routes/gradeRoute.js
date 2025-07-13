const express = require("express");
const {jwtAuth} = require("../middlewares/auth");
const {getAllGrades, createGrade, updateGrade, deleteGrade} = require("../controllers/gradeController");
const gradeRouter = express.Router();

gradeRouter.get("/", jwtAuth, getAllGrades);
gradeRouter.post("/add", jwtAuth, createGrade);
gradeRouter.put("/update/:id", jwtAuth, updateGrade);
gradeRouter.delete("/delete/:id", jwtAuth, deleteGrade);

module.exports = gradeRouter;