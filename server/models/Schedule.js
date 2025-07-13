const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const scheduleSchema = new Schema(
  {
    slotId: {
      type: Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    classId: {
      type: Types.ObjectId,
      ref: "Class",
      required: true,
    },
    roomId: {
      type: Types.ObjectId,
      ref: "Room",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent double booking of rooms
scheduleSchema.index({ roomId: 1, date: 1, slotId: 1 }, { unique: true });

// Compound index to prevent double booking of classes
scheduleSchema.index({ classId: 1, date: 1, slotId: 1 }, { unique: true });

module.exports = mongoose.model("Schedules", scheduleSchema);
