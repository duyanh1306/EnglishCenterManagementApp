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
        const mongoUserId = req.user?.id;
        const classIdParam = req.params.classid;

        if (!mongoose.Types.ObjectId.isValid(classIdParam)) {
            return res.status(400).json({
                success: false,
                message: "Invalid class ID"
            });
        }

        // 1. Find student
        const user = await User.findById(mongoUserId).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const studentId = user.id; // "u4" etc.

        // 2. Find class
        const enrolledClass = await Class.findById(classIdParam).lean();
        if (!enrolledClass) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        const isEnrolled = enrolledClass.students.some(
            s => s.toString() === mongoUserId
        );

        if (!isEnrolled) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this class"
            });
        }

        // 3. Get all schedules and filter manually
        const allSchedules = await Schedule.find().lean();
        const matchedSchedules = allSchedules.filter(
            s => s.classId?.toString() === enrolledClass._id.toString()
        );

        const scheduleIds = matchedSchedules.map(s => s.id); // e.g. ["1", "2"]

        if (scheduleIds.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No schedules found for this class",
                data: []
            });
        }

        // 4. Get all attendance for this student and filter manually
        const allAttendance = await Attendance.find({ studentId }).lean();
        const filteredAttendance = allAttendance.filter(a =>
            scheduleIds.includes(a.scheduleId)
        );

        res.status(200).json({
            success: true,
            message: "Attendance retrieved successfully",
            data: filteredAttendance
        });

    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getAllAttendanceOfStudent = async (req, res) => {
    try {
        const mongoUserId = req.user?.id;

        if (!mongoose.Types.ObjectId.isValid(mongoUserId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        // 1. Find user
        const user = await User.findById(mongoUserId).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const studentId = user.id; // e.g. "u4"

        // 2. Get all attendance records for this student
        const allAttendance = await Attendance.find({ studentId }).lean();
        if (allAttendance.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No attendance records found",
                data: []
            });
        }

        // 3. Get matching schedules
        const allSchedules = await Schedule.find().lean();
        const scheduleMap = Object.fromEntries(
            allSchedules.map(s => [s.id, s])
        );

        // 4. Optional: Load all classes for enrichment
        const allClasses = await Class.find().lean();
        const classMap = Object.fromEntries(
            allClasses.map(c => [c._id.toString(), c.name])
        );

        // 5. Build response
        const enriched = allAttendance.map(a => {
            const schedule = scheduleMap[a.scheduleId];
            return {
                scheduleId: a.scheduleId,
                className: schedule ? classMap[schedule.classId?.toString()] || "Unknown" : "Unknown",
                date: schedule?.date || null,
                slotId: schedule?.slotId || null,
                status: a.status
            };
        });

        res.status(200).json({
            success: true,
            message: "All attendance records retrieved successfully",
            data: enriched
        });

    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


module.exports = {
    addAttendance,
    getAllAttendances,
    getAttendanceByClassId,
    getAllAttendanceOfStudent,

};