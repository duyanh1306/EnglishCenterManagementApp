const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    ref: 'User',
    required: true
  }
});

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    ref: 'User',
    required: true
  }
});

const classSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teacherId: [teacherSchema],
  courseId: {
    type: String,
    ref: 'Course',
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  students: [studentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model("Class", classSchema); 