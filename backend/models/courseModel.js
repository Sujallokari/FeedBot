// models/courseModel.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  feedbackCount: {
    type: Number,
    default: 0,
  },
  positiveFeedbackCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Course", courseSchema);
