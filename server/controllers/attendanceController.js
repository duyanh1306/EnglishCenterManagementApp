const Schedule = require("../models/Schedule");
const Room = require("../models/Room");
const Class = require("../models/Class");
const Slot = require("../models/Slot");
const User = require("../models/User");
const Attendance = require("../models/Attendance");
const mongoose = require("mongoose");

const addAttendance = async (req, res) => {
    try {
        const { studentId, scheduleId, status } = req.body;
        const attendance = new Attendance({
            studentId,
            scheduleId,
            status,
        });
        await attendance.save();
        res.status(201).json({ message: "Attendance added successfully", attendance });
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find({});
        res.status(200).json({ message: "Attendances retrieved successfully", attendances });
    } catch (error) {
        console.error('Error getting all attendances:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAttendanceByClassId = async (req, res) => {
    try {
        const { classId } = req.params;
        const attendances = await Attendance.find({ classId });
        res.status(200).json({ message: "Attendances retrieved successfully", attendances });
    } catch (error) {
        console.error('Error getting all attendances:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    addAttendance,
    getAllAttendances,
};