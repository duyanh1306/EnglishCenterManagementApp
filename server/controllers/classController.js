const Class = require("../models/Class");
const Schedule = require("../models/Schedule");
const User = require("../models/User");
const mongoose = require("mongoose");

// GET /api/classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()

      .populate("courseId", "name")
      .populate("teachers", "fullName email")
      .populate("students", "fullName email")
      .populate("schedule.slot", "from to")
      .populate("schedule.room", "name location type");
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
      status,
      teachers,
      students,
      schedule,
    } = req.body;

    if (!Array.isArray(schedule) || schedule.length === 0) {
      return res.status(400).json({ error: "Schedule is required" });
    }

    for (let s of schedule) {
      if (!s.weekday || !s.slot || !s.room) {
        return res.status(400).json({
          error: "Each schedule item must include weekday, slot, and room",
        });
      }
    }

    // 1. Tạo lớp học
    const newClass = new Class({
      name,
      courseId,
      startDate,
      endDate,
      capacity,
      status,
      teachers,
      students,
      schedule, // lưu vào embedded array
    });

    await newClass.save();

    // 2. Đồng bộ dữ liệu sang bảng Schedules
    const scheduleDocs = schedule.map((s) => ({
      slotId: s.slot,
      roomId: s.room,
      date: getNextDateFromWeekday(s.weekday, startDate), // Tự tính ngày bắt đầu gần nhất theo thứ
      classId: newClass._id,
    }));

    await Schedule.insertMany(scheduleDocs);

    return res
      .status(201)
      .json({ message: "Class and schedules created", class: newClass });
  } catch (error) {
    console.error("Error creating class and schedules:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
function getNextDateFromWeekday(weekday, startDateStr) {
  const startDate = new Date(startDateStr);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDay = weekdays.indexOf(weekday);

  if (targetDay === -1) return startDate;

  const currentDay = startDate.getDay();
  const diff = (targetDay - currentDay + 7) % 7;
  startDate.setDate(startDate.getDate() + diff);

  return startDate;
}

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

    // Xóa các schedule cũ liên quan tới class
    await Schedule.deleteMany({ classId: id });

    // Tạo mới lại các schedule
    const schedules = req.body.schedule.map((s) => ({
      classId: updated._id,
      slotId: s.slot,
      roomId: s.room,
      date: getNextDateFromWeekday(s.weekday, req.body.startDate),
    }));

    await Schedule.insertMany(schedules);

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

    // Xóa các schedule cũ liên quan tới class
    await Schedule.deleteMany({ classId: id });

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
  }
};

const getAllClassesByUserId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const classes = await Class.find()
      .populate("courseId", "name")
      .populate("teachers", "fullName")
      .populate("schedule.slot", "from to")
      .lean();

    const formattedClasses = classes
      .filter((cls) => cls.students.some((s) => s.toString() === studentId))
      .map((cls) => ({
        _id: cls._id,
        name: cls.name,
        courseName: cls.courseId?.name || "N/A",
        teachers: cls.teachers || [],
        capacity: cls.capacity,
        status: cls.status || "ongoing",
        schedule: cls.schedule || [],
      }));

    res.status(200).json({
      success: true,
      message: "Classes retrieved successfully",
      data: formattedClasses,
    });
  } catch (error) {
    console.error("getAllClassesByUserId error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getClassesByUserId = async (req, res) => {
  const { classId } = req.params;
  try {
    const classData = await Class.findById(classId)
      .populate("teachers", "fullName")
      .populate("courseId", "name")
      .populate("students", "fullName email birthday")
      .populate({
        path: "schedule.slot",
        model: "Slot",
        select: "from to",
      });

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const scheduleFormatted = classData.schedule.map((item) => ({
      weekday: item.weekday,
      from: item.slot?.from || "N/A",
      to: item.slot?.to || "N/A",
    }));

    

    res.json({
      _id: classData._id,
      name: classData.name,
      teacher: classData.teachers.map((t) => t.fullName).join(", "),
      schedule: scheduleFormatted,
      room: "Room 101",
      status: classData.status,
      courseName: classData.courseId?.name || "N/A",
      students: classData.students.map((s) => ({
        id: s._id,
        name: s.fullName,
        email: s.email,
        birthday: s.birthday ? s.birthday.toISOString().split("T")[0] : "N/A",
      })),
    });
  } catch (error) {
    console.error("Failed to fetch class details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRegisterableClasses = async (req, res) => {
  try {
    const { studentId } = req.params;
    //find all classes
    const classes = await Class.find()
      .populate("courseId", "name")
      .populate("teachers", "fullName")
      .populate({
        path: "schedule.slot",
        model: "Slot",
        select: "from to",
      })
      .lean();

    const registerableClasses = classes.map((cls) => ({
      _id: cls._id,
      name: cls.name,
      courseName: cls.courseId?.name || "N/A",
      teachers: cls.teachers.map((t) => t.fullName).join(", ") || "N/A",
      capacity: cls.capacity,
      schedule: cls.schedule.map((s) => ({
        weekday: s.weekday,
        from: s.slot?.from || "N/A",
        to: s.slot?.to || "N/A",
      })),
      studentsCount: cls.students.length,
      status: cls.status,
      registered: cls.students.toString().includes(studentId),
    }));

    res.status(200).json(registerableClasses);
  } catch (error) {
    console.error("Error fetching registerable classes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const enrollInClass = async (req, res) => {
  try {
    const mongoUserId = req.user?.id; // JWT user _id
    const classId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(mongoUserId) ||
      !mongoose.Types.ObjectId.isValid(classId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID(s)",
        debug: {
          mongoUserId,
          classId,
          mongoUserIdValid: mongoose.Types.ObjectId.isValid(mongoUserId),
          classIdValid: mongoose.Types.ObjectId.isValid(classId),
        },
      });
    }

    // Ensure user exists
    const user = await User.findById(mongoUserId).lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Load the class
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    // Check if already enrolled
    const isAlreadyEnrolled = foundClass.students.some(
      (s) => s.toString() === mongoUserId
    );
    if (isAlreadyEnrolled) {
      return res
        .status(409)
        .json({ success: false, message: "Already enrolled in this class" });
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
    });
  } catch (error) {
    console.error("Error enrolling in class:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const unenrollFromClass = async (req, res) => {
  try {
    const classId = req.params.classid; // This is a Mongo ObjectId

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid class ID",
      });
    }

    // Step 1: Find user by app-level ID (e.g., "u4")
    const mongoUserId = req.user?.id; // MongoDB ObjectId from JWT

    if (!mongoose.Types.ObjectId.isValid(mongoUserId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(mongoUserId).lean(); // ✅ correct lookup
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Step 2: Find class
    const foundClass = await Class.findById(classId);
    if (!foundClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Step 3: Check if enrolled
    const index = foundClass.students.findIndex(
      (student) => student.toString() === mongoUserId.toString()
    );

    if (index === -1) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this class",
      });
    }

    // Step 4: Remove student
    foundClass.students.splice(index, 1);
    await foundClass.save();

    return res.status(200).json({
      success: true,
      message: "Successfully unenrolled from class",
    });
  } catch (error) {
    console.error("Error unenrolling:", error);
    return res.status(500).json({
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
  getAllClassesByUserId,
  getClassesByUserId,
  getRegisterableClasses,
  enrollInClass,
  unenrollFromClass,
};
