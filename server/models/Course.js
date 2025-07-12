const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const courseSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Course", courseSchema); 