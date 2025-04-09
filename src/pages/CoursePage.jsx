import React from "react";
import CourseCard from "@/components/CourseCard";

function CoursePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-6">Available Courses</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <CourseCard name="Course 1" code="CS101" />
          <CourseCard name="Course 2" code="CS102" />
          {/* Add more CourseCards as needed */}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
