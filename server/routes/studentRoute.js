const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const { getStudentSchedule } = require("../controllers/scheduleController");
const {
  getAllGradesOfAStudentInAllClasses,
  getGradesOfAStudent,
} = require("../controllers/gradeController");
const {
  getAllClassesByUserId,
  getClassesByUserId,
  getRegisterableClasses,
  enrollInClass,
  unenrollFromClass,
} = require("../controllers/classController");

router.get("/schedule", jwtAuth, getStudentSchedule);
router.get("/:studentId/grades", jwtAuth, getAllGradesOfAStudentInAllClasses);
router.get("/:studentId/grades/class/:classId", jwtAuth, getGradesOfAStudent);
router.get("/my-classes", jwtAuth, getAllClassesByUserId);
router.get("/my-classes/:id", jwtAuth, getClassesByUserId);
router.get("/:studentId/registerable-classes", jwtAuth, getRegisterableClasses);

router.post("/register-class/:classid", jwtAuth, enrollInClass);
router.delete("/register-class/:classid", jwtAuth, unenrollFromClass);
module.exports = router;
