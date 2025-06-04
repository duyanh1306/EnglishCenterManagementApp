import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // giáo viên
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // học sinh
  schedule: { type: String }, // VD: "Thứ 2-4-6 | 18:00-20:00"
  startDate: { type: Date },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Class", classSchema);
