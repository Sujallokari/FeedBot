import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

function FacultyCard({ name, branch, isAdmin }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
    setShowFeedbackForm(false);
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-[#EDEDED] text-sm">Branch: {branch}</p>

      {isAdmin ? (
        <div>
          <button className="mt-4 bg-[#9333EA] text-white py-2 px-4 rounded">
            Edit Faculty
          </button>
          <button className="mt-2 bg-[#9333EA] text-white py-2 px-4 rounded">
            Remove Faculty
          </button>
        </div>
      ) : (
        <>
          {feedbackSubmitted ? (
            <div className="mt-4 inline-flex items-center gap-1 bg-[#27272A] text-green-400 py-2 px-3 rounded text-sm font-medium shadow-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Submitted</span>
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
              >
                Submit Feedback
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FacultyCard;
