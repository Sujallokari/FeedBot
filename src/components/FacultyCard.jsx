import React from "react";

function FacultyCard({ name, branch, isAdmin }) {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-[#EDEDED] text-sm">Branch: {branch}</p>

      {/* Show the button only if it's the admin page */}
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
        <button className="mt-4 bg-[#9333EA] text-white py-2 px-4 rounded">
          Give Feedback
        </button>
      )}
    </div>
  );
}

export default FacultyCard;
