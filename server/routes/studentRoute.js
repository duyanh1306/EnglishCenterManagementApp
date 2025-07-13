const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const { getStudentSchedule } = require("../controllers/scheduleController");
const {getGradesByClassId,getAllStundentIdGrades} = require("../controllers/gradeController");
const {getAllClassesByUserId,getClassesByUserId,getRegisterableClasses} = require("../controllers/classController");




router.get("/schedule/", jwtAuth, getStudentSchedule);
router.get("/grades/:id",jwtAuth, getGradesByClassId);
router.get("/grades",jwtAuth,getAllStundentIdGrades);;
router.get("/my-classes",jwtAuth,getAllClassesByUserId);
router.get("/my-classes/:id",jwtAuth,getClassesByUserId);
router.get("/registerable-classes",jwtAuth,getRegisterableClasses); // chua co api co dinh



module.exports = router;