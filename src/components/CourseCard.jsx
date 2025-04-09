import React from "react";

function CourseCard({ name, code }) {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-colors cursor-pointer">
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-[#EDEDED] text-sm">Course Code: {code}</p>
      <button className="mt-4 bg-[#9333EA] text-white py-2 px-4 rounded">Give Feedback</button>
    </div>
  );
}

export default CourseCard;
