import React from "react";
import FacultyCard from "@/components/FacultyCard"; // Assuming FacultyCard is in the components folder
import Header from "@/components/Header";

function FacultyPage({ isAdmin }) {
  // Static faculty data (could also be dynamic from API)
  const faculties = [
    { id: 1, name: "Dr. John Doe", branch: "Computer Science" },
    { id: 2, name: "Prof. Jane Smith", branch: "Mathematics" },
    { id: 3, name: "Dr. Richard Roe", branch: "Physics" },
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isAdmin ? "Admin: Faculty Management" : "Faculty"}
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            {faculties.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                name={faculty.name}
                branch={faculty.branch}
                isAdmin={isAdmin} // Pass the dynamic 'isAdmin' prop
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyPage;
