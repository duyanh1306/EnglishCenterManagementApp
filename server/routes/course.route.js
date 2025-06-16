const express = require("express");
const CourseRouter = express.Router();
const CourseController = require("../controllers/Course.controller");

CourseRouter.get("/", CourseController.getAllCourses);
CourseRouter.get("/:id", CourseController.getCourseById);
CourseRouter.post("/", CourseController.createCourse);
CourseRouter.put("/:id", CourseController.updateCourse);
CourseRouter.delete("/:id", CourseController.deleteCourse);

module.exports = CourseRouter;
