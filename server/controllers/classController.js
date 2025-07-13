const Class = require('../models/Class');
const User = require("../models/User");
require("../models/course")
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
  // Test student enrolled jwt
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzI3MjIzMzRjZmRkODk4ZjY2MTQ4ZCIsInVzZXJOYW1lIjoicGhhbXRoaWQiLCJyb2xlIjoicjMiLCJpYXQiOjE3NTIzMzA4NDUsImV4cCI6MTc1MjkzNTY0NX0.C4zQVn0M5xMOBTjQ0SOzy-glMN18_j_5qxzSysIpCJ4
// Test student not enrolled jwt
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzI3MjIzMzRjZmRkODk4ZjY2MTQ5MyIsInVzZXJOYW1lIjoidHJhbnRoaWoiLCJyb2xlIjoicjMiLCJpYXQiOjE3NTIzNzU4OTMsImV4cCI6MTc1Mjk4MDY5M30.42OQx_0fw9GffCFFz5FRQz7ShyiJdIKp-4bFCFXwcWg

  try {
    const mongoUserId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(mongoUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    const user = await User.findById(mongoUserId).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const userObjectIdStr = mongoUserId.toString();

    // Get all available classes (status filtered)
    const allAvailableClasses = await Class.find({
      status: { $in: ["ongoing", "upcoming"] }
    }).lean();

    // Filter out classes the student is already in
    const notEnrolledClasses = allAvailableClasses.filter(cls =>
        !cls.students.some(s => s.toString() === userObjectIdStr)
    );

    res.status(200).json({
      success: true,
      message: "Registerable classes retrieved successfully",
      data: notEnrolledClasses
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

const enrollInClass = async (req, res) => {
  try {
    const mongoUserId = req.user?.id; // JWT user _id
    const classId = req.params.classid;

    if (!mongoose.Types.ObjectId.isValid(mongoUserId) || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID(s)",
        debug: {
          mongoUserId,
          classId,
          mongoUserIdValid: mongoose.Types.ObjectId.isValid(mongoUserId),
          classIdValid: mongoose.Types.ObjectId.isValid(classId)
        }
      });
    }

    // Ensure user exists
    const user = await User.findById(mongoUserId).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Load the class
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    // Check if already enrolled
    const isAlreadyEnrolled = foundClass.students.some(
        s => s.toString() === mongoUserId
    );
    if (isAlreadyEnrolled) {
      return res.status(409).json({ success: false, message: "Already enrolled in this class" });
    }

    // Check capacity
    if (foundClass.students.length >= foundClass.capacity) {
      return res.status(400).json({ success: false, message: "Class is full" });
    }

    // ✅ Push raw ObjectId to the students array
    foundClass.students.push(new mongoose.Types.ObjectId(mongoUserId));
    await foundClass.save();

    res.status(200).json({
      success: true,
      message: "Successfully enrolled",
      data: foundClass
    });

  } catch (error) {
    console.error("Error enrolling in class:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const unenrollFromClass = async (req, res) => {
  try {
    const classId = req.params.classid;    // This is a Mongo ObjectId

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid class ID"
      });
    }

    // Step 1: Find user by app-level ID (e.g., "u4")
    const mongoUserId = req.user?.id; // MongoDB ObjectId from JWT

    if (!mongoose.Types.ObjectId.isValid(mongoUserId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(mongoUserId).lean(); // ✅ correct lookup
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    // Step 2: Find class
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    // Step 3: Check if enrolled
    const index = foundClass.students.findIndex(
        student => student.toString() === mongoUserId.toString()
    );

    if (index === -1) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this class"
      });
    }

    // Step 4: Remove student
    foundClass.students.splice(index, 1);
    await foundClass.save();

    return res.status(200).json({
      success: true,
      message: "Successfully unenrolled from class"
    });

  } catch (error) {
    console.error("Error unenrolling:", error);
    return res.status(500).json({
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
  getRegisterableClasses,
  enrollInClass,
  unenrollFromClass

};

