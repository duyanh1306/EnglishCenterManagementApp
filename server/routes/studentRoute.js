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
const {
  getAttendanceByClassId,
  getAllAttendanceOfStudent,
} = require("../controllers/attendanceController");

router.get("/schedule/", jwtAuth, getStudentSchedule);
router.get("/:studentId/grades", getAllGradesOfAStudentInAllClasses);
router.get("/:studentId/grades/class/:classId", getGradesOfAStudent);
router.get("/my-classes", jwtAuth, getAllClassesByUserId);
router.get("/my-classes/:id", jwtAuth, getClassesByUserId);
router.get("/:studentId/registerable-classes", getRegisterableClasses); // chua co api co dinh

router.post("/register-class/:classid", jwtAuth, enrollInClass);
router.delete("/register-class/:classid", jwtAuth, unenrollFromClass);
module.exports = router;
