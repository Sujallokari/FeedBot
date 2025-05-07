// FacultyCard.jsx
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

function FacultyCard({ faculty, isAdmin, userId }) {
  const [feedbackFormVisibility, setFeedbackFormVisibility] = useState({});
  const [feedbackSubmittedMap, setFeedbackSubmittedMap] = useState({});
  const [feedbackTextMap, setFeedbackTextMap] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle click to open feedback form
  const handleFeedbackClick = (facultyId) => {
    setFeedbackFormVisibility((prev) => ({ ...prev, [facultyId]: true }));
  };

  // Submit feedback to backend
  const handleSubmitFeedback = async (facultyId) => {
    const feedbackText = feedbackTextMap[facultyId]?.trim();
    if (!feedbackText) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/feedback/faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedbackText,
          faculty: facultyId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const result = await response.json();
      console.log("Server response:", result);

      setFeedbackSubmittedMap((prev) => ({
        ...prev,
        [facultyId]: true,
      }));

      setFeedbackFormVisibility((prev) => ({
        ...prev,
        [facultyId]: false,
      }));

      setFeedbackTextMap((prev) => ({
        ...prev,
        [facultyId]: "",
      }));
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">{faculty.name}</h3>
      <p className="text-[#EDEDED] text-sm">Branch: {faculty.department}</p>

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
          {feedbackSubmittedMap[faculty._id] ? (
            <div className="mt-4 inline-flex items-center gap-1 bg-[#27272A] text-green-400 py-2 px-3 rounded text-sm font-medium shadow-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Submitted</span>
            </div>
          ) : (
            <>
              <button
                className="mt-4 bg-[#9333EA] text-white py-2 px-4 rounded font-medium"
                onClick={() => handleFeedbackClick(faculty._id)}
              >
                Give Feedback
              </button>

              {feedbackFormVisibility[faculty._id] && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 rounded bg-[#2A2A2A] text-white border border-[#6B21A8] focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                    placeholder="Write your feedback..."
                    value={feedbackTextMap[faculty._id] || ""}
                    onChange={(e) =>
                      setFeedbackTextMap((prev) => ({
                        ...prev,
                        [faculty._id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="mt-2 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded font-medium"
                    onClick={() => handleSubmitFeedback(faculty._id)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default FacultyCard;
