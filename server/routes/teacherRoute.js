const express = require("express");
const router = express.Router();
const { 
    getTeachingSchedule, 
    getTeachingSlots, 
    getTeachingClasses,
    getTeachingClassDetails,
    getCourses,
    getCourseDetails,
    getGradesOfAClass,
    getGradesOfAStudent,
    addGradeToAStudent,
    updateGradesOfAStudent
} = require("../controllers/teacherController");
const authTeacher = require("../middlewares/authTeacher");

// Get teaching schedule for a specific teacher
router.get("/:teacherId/schedules", authTeacher, getTeachingSchedule);

// Get teaching slots
router.get("/slots", authTeacher, getTeachingSlots);

// Get teaching classes
router.get("/:teacherId/classes", authTeacher, getTeachingClasses);

// Get teaching class details
router.get("/:teacherId/classes/:classId", authTeacher, getTeachingClassDetails);

//Get courses
router.get("/:teacherId/courses", authTeacher, getCourses);

//Get course details
router.get("/:teacherId/courses/:courseId", authTeacher, getCourseDetails);

// Get grades of a specific class
router.get("/:teacherId/classes/:classId/grades", authTeacher, getGradesOfAClass);

// Get grades for a specific student in a class
router.get("/:teacherId/classes/:classId/grades/student/:studentId", authTeacher, getGradesOfAStudent);

// Add grades for a specific student in a class
router.post("/:teacherId/classes/:classId/grades/student/:studentId", authTeacher, addGradeToAStudent);

// Update grades for a specific student in a class
router.patch("/:teacherId/classes/:classId/grades/student/:studentId", authTeacher, updateGradesOfAStudent);

module.exports = router; 