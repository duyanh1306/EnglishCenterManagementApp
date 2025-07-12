const express = require("express");
const router = express.Router();
const {getAllCourses, createCourse, updateCourse, deleteCourse  } = require("../controllers/courseController");

router.get("/", getAllCourses);
router.post("/add",createCourse);
router.put("/update/:id",updateCourse);
router.delete("/delete/:id", deleteCourse);
module.exports = router;
