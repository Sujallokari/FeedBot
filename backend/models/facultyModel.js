// models/Faculty.js
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  feedbackCount: { type: Number, default: 0 },
  positiveFeedbackCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Faculty", facultySchema);
