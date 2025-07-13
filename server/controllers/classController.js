const Class = require("../models/Class");

// GET /api/classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()

      .populate("courseId", "name")

      .populate("teachers", "fullName email")
      .populate("students", "fullName email")
      .populate("schedule.slot", "from to");
    res.status(200).json({
      success: true,
      message: "Classes retrieved successfully",
      data: classes,
    });
  } catch (error) {
    console.error("Error getting all classes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// POST /api/classes/add
// Create new class
const createClass = async (req, res) => {
  try {
    const {
      name,
      courseId,
      startDate,
      endDate,
      capacity,
      schedule,
      status,
      teachers,
      students,
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (
      !name ||
      !courseId ||
      !startDate ||
      !endDate ||
      !capacity ||
      !Array.isArray(schedule) ||
      schedule.length === 0 ||
      !Array.isArray(teachers) ||
      teachers.length === 0 ||
      !Array.isArray(students)
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Kiểm tra giới hạn học sinh
    if (students.length > capacity) {
      return res.status(400).json({
        success: false,
        message: "Class is over capacity",
      });
    }

    const newClass = new Class({
      name,
      courseId,
      startDate,
      endDate,
      capacity,
      schedule,
      status: status || "ongoing",
      teachers,
      students,
    });

    const savedClass = await newClass.save();

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: savedClass,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// PUT /api/classes/update/:id
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("courseId", "name");

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE /api/classes/delete/:id
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Class.findByIdAndDelete(id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
};
