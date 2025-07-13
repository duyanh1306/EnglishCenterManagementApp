const express = require("express");
const { getAllSchedule,getStudentSchedule } = require("../controllers/scheduleController");

const scheduleRouter = express.Router();

scheduleRouter.get("/", getAllSchedule);

module.exports = scheduleRouter;
