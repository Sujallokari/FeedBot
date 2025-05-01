const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    feedbackText: {
      type: String,
      required: true,
    },
    sentiment: {
      type: Number, // 1 for positive, 0 for neutral, -1 for negative
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // Reference to Faculty model
      required: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Reference to Course model
      required: false,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
