const express = require("express");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin");
const authTeacher = require("../middlewares/authTeacher");
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.get("/", authAdmin, getAllCourses);
router.post("/add",  createCourse);
router.put("/update/:id",  updateCourse);
router.delete("/delete/:id", deleteCourse);
module.exports = router;
