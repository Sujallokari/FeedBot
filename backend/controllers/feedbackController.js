const Feedback = require("../models/feedbackModel");
const Faculty = require("../models/facultyModel");  // Assuming you have a Faculty model for faculty data
const analyzeSentiment = require("../utils/analyzeSentiment");
const Course = require("../models/courseModel")

exports.submitFacultyFeedback = async (req, res) => {
  try {
    const { feedbackText, faculty, user } = req.body;

    if (!feedbackText || !faculty) {
      return res.status(400).json({ message: "Feedback text and faculty ID are required." });
    }

    // Analyze sentiment of the feedback text
    const sentiment = analyzeSentiment(feedbackText);

    // Create new feedback record
    const feedback = new Feedback({
      feedbackText,
      sentiment,
      faculty,
      user,
    });

    // Save feedback to the database
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", sentiment });
  } catch (error) {
    console.error("Error submitting faculty feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitCourseFeedback = async (req, res) => {
  try {
    const { feedbackText, course, user } = req.body;

    if (!feedbackText || !course) {
      return res.status(400).json({ message: "Feedback text and course ID are required." });
    }

    // Analyze sentiment of the feedback text
    const sentiment = analyzeSentiment(feedbackText);

    // Create new feedback record
    const feedback = new Feedback({
      feedbackText,
      sentiment,
      course,
      user,
    });

    // Save feedback to the database
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", sentiment });
  } catch (error) {
    console.error("Error submitting course feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch feedback statistics for a specific faculty
exports.getFacultyFeedbackStats = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    // Fetch faculty data to ensure the faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Get all feedback for the given faculty
    const feedbacks = await Feedback.find({ faculty: facultyId });

    // If no feedback exists for this faculty, return appropriate message
    if (feedbacks.length === 0) {
      return res.status(200).json({
        message: "No feedback available for this faculty",
        feedbackCount: 0,
        positiveCount: 0,
        averageRating: 0,
      });
    }

    // Count the different types of feedbacks
    const positiveFeedbacks = feedbacks.filter(feedback => feedback.sentiment === 1).length;
    const neutralFeedbacks = feedbacks.filter(feedback => feedback.sentiment === 0).length;
    const negativeFeedbacks = feedbacks.filter(feedback => feedback.sentiment === -1).length;

    // Total feedback count
    const totalFeedbacks = feedbacks.length;

    // Calculate the average rating (out of 5)
    const averageRating = (
      ((neutralFeedbacks + positiveFeedbacks) / totalFeedbacks) * 5
    ).toFixed(2);

    // Return the stats

    res.status(200).json({
      feedbackCount: totalFeedbacks,
      positiveCount: positiveFeedbacks,
      averageRating,
    });
  } catch (error) {
    console.error("Error fetching feedback stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all feedback for a specific faculty
exports.getFacultyFeedback = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    // Fetch faculty data to ensure the faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Get all feedback for the given faculty
    const feedbacks = await Feedback.find({ faculty: facultyId });

    // If no feedback exists for this faculty, return appropriate message
    if (feedbacks.length === 0) {
      return res.status(200).json({ message: "No feedback available for this faculty" });
    }

    // Categorize feedbacks by sentiment (only positive and negative)
    const positiveFeedbacks = feedbacks.filter(feedback => feedback.sentiment === 1);
    const negativeFeedbacks = feedbacks.filter(feedback => feedback.sentiment === -1);

    // Return only positive and negative feedbacks
    res.status(200).json({
      positiveFeedbacks,
      negativeFeedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Fetch feedback statistics for a specific faculty
exports.getCourseFeedbackStats = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Fetch course data to ensure the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get all feedback for the given course
    const feedbacks = await Feedback.find({ course: courseId });

    // If no feedback exists for this course, return appropriate message
    if (feedbacks.length === 0) {
      return res.status(200).json({
        message: "No feedback available for this course",
        feedbackCount: 0,
        positiveCount: 0,
        averageRating: 0,
      });
    }

    // Count the different types of feedbacks
    const positiveFeedbacks = feedbacks.filter(feedback => feedback.sentiment === 1).length;
    const neutralFeedbacks = feedbacks.filter(feedback => feedback.sentiment === 0).length;
    const negativeFeedbacks = feedbacks.filter(feedback => feedback.sentiment === -1).length;

    // Total feedback count
    const totalFeedbacks = feedbacks.length;

    // Calculate the average rating (out of 5)
    const averageRating = (
      ((neutralFeedbacks + positiveFeedbacks) / totalFeedbacks) * 5
    ).toFixed(2);

    // Return the stats
    res.status(200).json({
      feedbackCount: totalFeedbacks,
      positiveCount: positiveFeedbacks,
      averageRating,
    });
  } catch (error) {
    console.error("Error fetching course feedback stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Fetch all feedback for a specific course
exports.getCourseFeedback = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Fetch course data to ensure the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get all feedback for the given course
    const feedbacks = await Feedback.find({ course: courseId });

    // If no feedback exists for this course, return appropriate message
    if (feedbacks.length === 0) {
      return res.status(200).json({ message: "No feedback available for this course" });
    }

    // Categorize feedbacks by sentiment (only positive and negative)
    const positiveFeedbacks = feedbacks.filter(feedback => feedback.sentiment === 1);
    const negativeFeedbacks = feedbacks.filter(feedback => feedback.sentiment === -1);

    // Return only positive and negative feedbacks
    res.status(200).json({
      positiveFeedbacks,
      negativeFeedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
