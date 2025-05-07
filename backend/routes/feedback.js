// routes/feedback.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Route to submit faculty feedback
router.post("/faculty", feedbackController.submitFacultyFeedback);

// Route to submit course feedback
router.post("/course", feedbackController.submitCourseFeedback);

//  route for fetching faculty feedback stats
router.get("/faculty/feedback/:facultyId/stats", feedbackController.getFacultyFeedbackStats);

// Route to fetch all feedback for a faculty
router.get("/faculty/:facultyId", feedbackController.getFacultyFeedback);

//  route for fetching course feedback stats
router.get("/course/feedback/:courseId/stats", feedbackController.getCourseFeedbackStats);

// Route to fetch all feedback for a course
router.get("/course/:courseId", feedbackController.getCourseFeedback);

module.exports = router;



