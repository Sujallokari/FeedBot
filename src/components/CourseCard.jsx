import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";

function CourseCard({ _id, name, code }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentiment, setSentiment] = useState(null);

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText) {
      alert("Please write your feedback.");
      return;
    }

    setIsSubmitting(true);
    try {
      const feedbackData = {
        feedbackText,
        course: _id, // Only course, no faculty
      };

      const response = await axios.post("http://localhost:5000/api/feedback/course", feedbackData);

      if (response.status === 201) {
        setSentiment(response.data.sentiment);
        setFeedbackSubmitted(true);
        setShowFeedbackForm(false);
        setFeedbackText("");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-colors cursor-pointer">
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-[#EDEDED] text-sm">Course Code: {code}</p>

      {feedbackSubmitted ? (
        <div className="mt-4 inline-flex items-center gap-1 bg-[#27272A] text-green-400 py-2 px-3 rounded text-sm font-medium shadow-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Feedback Submitted</span>
        </div>
      ) : (
        <button
          className="mt-4 bg-[#9333EA] text-white py-2 px-4 rounded font-medium"
          onClick={handleFeedbackClick}
        >
          Give Feedback
        </button>
      )}

      {showFeedbackForm && !feedbackSubmitted && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 rounded bg-[#2A2A2A] text-white border border-[#6B21A8] focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            placeholder="Write your feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <button
            className="mt-2 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded font-medium"
            onClick={handleSubmitFeedback}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      )}

     
    </div>
  );
}

export default CourseCard;
