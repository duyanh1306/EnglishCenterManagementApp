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

module.exports = {
  getAllClasses
};

