const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userSchema = new Schema({
  
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  number: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  roleId: {
    type: String,
    ref: 'Role',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema); 