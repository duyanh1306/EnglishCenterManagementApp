const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const { getStudentSchedule } = require("../controllers/scheduleController");
const {getGradesByClassId,getAllStundentIdGrades} = require("../controllers/gradeController");
const {getAllClassesByUserId,getClassesByUserId,getRegisterableClasses,enrollInClass,unenrollFromClass} = require("../controllers/classController");
const {getAttendanceByClassId,getAllAttendanceOfStudent} = require("../controllers/attendanceController");



router.get("/schedule/", jwtAuth, getStudentSchedule);
router.get("/grades/:id",jwtAuth, getGradesByClassId);
router.get("/grades",jwtAuth,getAllStundentIdGrades);
router.get("/my-classes",jwtAuth,getAllClassesByUserId);
router.get("/my-classes/:id",jwtAuth,getClassesByUserId);
router.get("/registerable-classes",jwtAuth,getRegisterableClasses); // chua co api co dinh
router.get("/attendance/:classid",jwtAuth,getAttendanceByClassId);
router.get("/attendance",jwtAuth,getAllAttendanceOfStudent);
router.post("/register-class/:id",jwtAuth,enrollInClass);
router.delete("/register-class/:classid",jwtAuth,unenrollFromClass);
module.exports = router;