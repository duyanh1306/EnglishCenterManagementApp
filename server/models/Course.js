import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number }, // số giờ học
  startDate: { type: Date },
  endDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema, "Courses");
