const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    ref: 'User',
    required: true
  },
  classId: {
    type: String,
    ref: 'Class',
    required: true
  },
  courseId: {
    type: String,
    ref: 'Course',
    required: true
  },
  score: {
    listening: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    reading: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    writing: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    speaking: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    }
  },
  type: {
    type: String,
    enum: ['midterm', 'final'],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Grade", gradeSchema); 