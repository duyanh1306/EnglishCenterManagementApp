const Class = require('../models/Class');
const User = require("../models/User");
const mongoose = require('mongoose');  // Add this line at the very top

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({});

    res.status(200).json({
      success: true,
      message: 'Classes retrieved successfully',
      data: classes
    });
  } catch (error) {
    console.error('Error getting all classes:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }); 
  }
};

const getAllClassesByUserId = async (req, res) => {
  try {
    const mongoUserId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(mongoUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const objectId = new mongoose.Types.ObjectId(mongoUserId);

    // 1. Validate user exists
    const user = await User.findById(objectId).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 2. Match classes that contain this ObjectId in students[]
    const classes = await Class.find().lean();

    const filtered = classes.filter(c =>
        c.students.some(student => student.toString() === req.user.id)
    );


    if (!classes.length) {
      return res.status(404).json({
        success: false,
        message: "No classes found for this student"
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes retrieved successfully",
      data: filtered
    });

  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


const getClassesByUserId = async (req, res) => {
  try {
    const mongoUserId = req.user?.id; // MongoDB _id from JWT
    const classId = req.params.id; // Class Mongo _id from URL param

    // Step 1: Verify user exists
    const user = await User.findById(mongoUserId).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Step 2: Find class by _id
    const enrolledClass = await Class.findById(classId).lean();
    if (!enrolledClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    // Step 3: Check if user._id is in the students array (ObjectId comparison)
    const isEnrolled = enrolledClass.students.some(student =>
        student.toString() === mongoUserId
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this class"
      });
    }

    // ✅ Success
    res.status(200).json({
      success: true,
      message: "Class retrieved successfully",
      data: enrolledClass
    });

  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const getRegisterableClasses = async (req, res) => {
  try {
    const mongoUserId = req.user?.id; // Extracted from JWT

    // Step 1: Find the student by MongoDB _id
    const user = await User.findById(mongoUserId).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Step 2: Find all classes the student is NOT enrolled in
    const availableClasses = await Class.find({
      students: { $ne: mongoose.Types.ObjectId(mongoUserId) },
      status: { $in: ["ongoing", "upcoming"] } // optional filter
    }).lean();

    res.status(200).json({
      success: true,
      message: "Available classes retrieved successfully",
      data: availableClasses
    });

  } catch (error) {
    console.error("Error fetching registerable classes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {
  getAllClasses,
  getAllClassesByUserId,
  getClassesByUserId,
  getRegisterableClasses
};

