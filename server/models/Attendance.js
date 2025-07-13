const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true
    },
    scheduleId: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Attendance", attendanceSchema);