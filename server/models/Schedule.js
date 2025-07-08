const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  slotId: {
    type: String,
    ref: 'Slot',
    required: true
  },
  classId: {
    type: String,
    ref: 'Class',
    required: true
  },
  roomId: {
    type: String,
    ref: 'Room',
    required: true
  },
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD format
  },
  meeting: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Compound index to prevent double booking of rooms
scheduleSchema.index({ roomId: 1, date: 1, slotId: 1 }, { unique: true });

// Compound index to prevent double booking of classes
scheduleSchema.index({ classId: 1, date: 1, slotId: 1 }, { unique: true });

module.exports = mongoose.model("Schedule", scheduleSchema); 