const Grades = require("../models/grade");
const User = require("../models/User");
const Class = require("../models/Class");
const mongoose = require("mongoose");

const getAllGrades = async (req, res) => {
    try {
        const grades = await Grades.find({});
        res.status(200).json({
            success: true,
            message: "Grades retrieved successfully",
            data: grades
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

const createGrades = async (req, res) => {
    try {
        const { id,studentId,classId,courseId,score,type,date,comment } = req.body;

        const newGrades = new Grades({
            id,
            studentId,
            classId,
            courseId,
            score,
            type,
            date,
            comment
        });

        const savedGrades = await newGrades.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: savedGrades
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

const updateGrades = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, price, status, level } = req.body;

        const updatedGrades = await Grades.findOneAndUpdate(
            { id: id },
            { name, description, image, price, status, level },
            { new: true, runValidators: true }
        );

        if (!updatedGrades) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedGrades
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

const deleteGrades = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGrades = await Grades.findOneAndDelete({ id: id });

        if (!deletedGrades) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: deletedGrades
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

const getAllStundentIdGrades = async (req, res) => {
    try {
        const mongoUserId = req.user?.id;

        if (!mongoUserId || !mongoose.Types.ObjectId.isValid(mongoUserId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing user ID"
            });
        }

        // 1. Get the user to retrieve the app-level student ID (e.g., "u4")
        const user = await User.findById(mongoUserId).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const studentId = user.id; // this is like "u4"

        // 2. Get all classes and check enrollment manually
        const allClasses = await Class.find().lean();

        const enrolledClassIds = allClasses
            .filter(cls => cls.students?.some(s => s.toString() === mongoUserId))
            .map(cls => new mongoose.Types.ObjectId(cls._id))



        // 3. Get grades
        const allGrades = await Grades.find().lean();

        const grades = allGrades.filter(
            g =>
                enrolledClassIds.some(cid => cid.toString() === g.classId.toString()) &&
                g.studentId === studentId
        );

        const classes = await Class.find().lean();
        const classMap = Object.fromEntries(classes.map(cls => [cls._id.toString(), cls.name]));

        const finalData = grades.map(grade => ({
            class: classMap[grade.classId.toString()] || "Unknown Class",
            score: grade.score,
            comment: grade.comment
        }));

        res.status(200).json({
            success: true,
            message: "Grades for the class retrieved successfully",
            data: finalData
        });


        // 🔍 Return debug info for troubleshooting in Postman
        res.status(200).json({
            success: true,
            message: "Grades of student retrieved successfully",
            data: finalData
        });

    } catch (error) {
        console.error("Error fetching grades:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


const getGradesByClassId = async (req, res) => {
    try {
        const mongoUserId = req.user?.id;
        const classIdParam = req.params.id;

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

        const studentId = user.id;

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

        // 3. Fetch and filter all grades manually
        const allGrades = await Grades.find().lean();

        const filtered = allGrades.filter(g =>
            g.classId?.toString() === classIdParam &&
            g.studentId === studentId
        );

        const classes = await Class.find().lean();
        const classMap = Object.fromEntries(classes.map(cls => [cls._id.toString(), cls.name]));

        const finalData = filtered.map(grade => ({
            class: classMap[grade.classId.toString()] || "Unknown Class",
            score: grade.score,
            comment: grade.comment
        }));

        res.status(200).json({
            success: true,
            message: "Grades for the class retrieved successfully",
            data: finalData
        });


    } catch (error) {
        console.error("Error fetching grades:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};




module.exports = {
    getAllGrades,
    createGrades,
    updateGrades,
    deleteGrades,
    getAllStundentIdGrades,
    getGradesByClassId
};
