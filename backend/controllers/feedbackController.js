const Feedback = require("../models/feedbackModel");

// Function to submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { feedbackText, faculty, course } = req.body;

    // Classify the sentiment (here you could use your Python-based sentiment analysis API)
    const sentiment = classifySentiment(feedbackText);  // Add your sentiment classification logic here

    // Create a new feedback document
    const feedback = new Feedback({
      feedbackText,
      sentiment,
      faculty,
      course,
    });

    // Save the feedback to the database
    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

// Helper function for sentiment analysis (you can replace this with a call to your Python API)
const classifySentiment = (feedbackText) => {
  // Example: Positive sentiment (1), Negative sentiment (-1), Neutral (0)
  if (feedbackText.includes("good") || feedbackText.includes("excellent")) {
    return 1;  // Positive
  } else if (feedbackText.includes("bad") || feedbackText.includes("poor")) {
    return -1;  // Negative
  } else {
    return 0;  // Neutral
  }
};

module.exports = { submitFeedback };
