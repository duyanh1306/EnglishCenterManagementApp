const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Course",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    schedule: [
      {
        weekday: {
          type: String,
          required: true,
        },
        slot: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Slot",
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["ongoing", "finished", "cancelled"],
      default: "ongoing",
      required: true,
    },
    teachers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    students: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
