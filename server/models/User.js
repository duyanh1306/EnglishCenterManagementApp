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
    unique: [true, "Email is already registered"],
  },
  number: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  roleId: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema); 