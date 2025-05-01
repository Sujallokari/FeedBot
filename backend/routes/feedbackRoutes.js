const express = require("express");
const { submitFeedback } = require("../controllers/feedbackController");

const router = express.Router();

// Route to submit feedback
router.post("/submit", submitFeedback);

module.exports = router;
