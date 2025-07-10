const express = require("express");
const router = express.Router();
const authTeacher = require("../middlewares/authTeacher");
const authAdmin = require("../middlewares/authAdmin");
const { getTeacherSchedule } = require("../controllers/teacherController");

// Get teaching schedule for a specific teacher
router.get("/:teacherId/schedule", authTeacher, getTeacherSchedule);

module.exports = router; 