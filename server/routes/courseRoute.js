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

<<<<<<< HEAD
router.get("/", authAdmin, getAllCourses);
router.post("/add",  createCourse);
router.put("/update/:id",  updateCourse);
=======
router.get("/", getAllCourses);
router.post("/add", createCourse);
router.put("/update/:id", updateCourse);
>>>>>>> d328f3944ed457119c90ecb66dd0847355c1dae6
router.delete("/delete/:id", deleteCourse);
module.exports = router;
