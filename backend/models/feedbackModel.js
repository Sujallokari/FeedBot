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
      ref: "Faculty",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Ensure that either faculty or course is provided
feedbackSchema.pre('save', function (next) {
  if (!this.course && !this.faculty) {
    return next(new Error('Either course or faculty ID must be provided.'));
  }
  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
