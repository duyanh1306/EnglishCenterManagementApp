const Schedule = require("../models/Schedule");
const Room = require("../models/Room");
const Class = require("../models/Class");
const Slot = require("../models/Slot");
const User = require("../models/User");
const mongoose = require("mongoose");
const getAllSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.find({});
        res.status(200).json({
            success: true,
            message: "Grades retrieved successfully",
            data: schedule
        });
    } catch (error) {
        console.error('Error getting all courses:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const createSchedule = async (req, res) => {
    try {
        const {  slotId, classId, roomId, date, meeting } = req.body;

        const newCourse = new Schedule({

            slotId,
            classId,
            roomId,
            date,
            meeting
        });

        const savedCourse = await newCourse.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: savedCourse
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { slotId, classId, roomId, date, meeting } = req.body;

        const updateSchedule = await Schedule.findOneAndUpdate(
            { id: id },
            { slotId, classId, roomId, date, meeting },
            { new: true, runValidators: true }
        );

        if (!updateSchedule) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updateSchedule
        });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteSchedule = await Schedule.findOneAndDelete({ id: id });

        if (!deleteSchedule) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: deleteSchedule
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};



const getStudentSchedule = async (req, res) => {
    try {
        const mongoUserId = req.user?.id;

        if (!mongoose.Types.ObjectId.isValid(mongoUserId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(mongoUserId).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const allClasses = await Class.find().lean();
        const enrolledClasses = allClasses.filter(cls =>
            cls.students?.some(s => s.toString() === mongoUserId)
        );

        if (enrolledClasses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No classes found for this student"
            });
        }

        const enrolledClassIds = enrolledClasses.map(cls => cls._id.toString());

        const [allSchedules, slots, rooms] = await Promise.all([
            Schedule.find().lean(),
            Slot.find().lean(),
        ]);

        const scheduleFiltered = allSchedules.filter(s =>
            enrolledClassIds.includes(s.classId.toString())
        );

        const slotMap = Object.fromEntries(slots.map(slot => [slot._id, slot]));
        const classMap = Object.fromEntries(enrolledClasses.map(cls => [cls._id.toString(), cls]));

        const enrichedSchedule = scheduleFiltered.map(s => ({
            date: s.date,
            meeting: s.meeting,
            slotTime: slotMap[s.slotId]
                ? { from: slotMap[s.slotId].from, to: slotMap[s.slotId].to }
                : null,
            className: classMap[s.classId.toString()]?.name || ""
        }));

        res.status(200).json({
            success: true,
            message: "Student schedule retrieved successfully",
            data: enrichedSchedule
        });

    } catch (error) {
        console.error("Error fetching schedule:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



module.exports = {
    getAllSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getStudentSchedule,

};
