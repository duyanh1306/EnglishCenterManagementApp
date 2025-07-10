const Class = require('../models/Class');

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

// Create new class
const createClass = async (req, res) => {
  try {
    const { id, name, description, teacherId, courseId, startDate, status, students } = req.body;
    
    const newClass = new Class({
      id,
      name,
      description,
      teacherId,
      courseId,
      startDate,
      status,
      students
    });

    const savedClass = await newClass.save();

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: savedClass
    });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update class by ID
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, teacherId, courseId, startDate, status, students } = req.body;

    const updatedClass = await Class.findOneAndUpdate(
      { id: id },
      { name, description, teacherId, courseId, startDate, status, students },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete class by ID
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await Class.findOneAndDelete({ id: id });

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deletedClass
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass
};

