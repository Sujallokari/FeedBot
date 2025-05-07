import React, { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import axios from "axios"; // Make sure axios is installed

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses"); // Update URL if needed
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-6">Available Courses</h1>
        
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-white">No courses available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id || course.id} // _id if MongoDB, id if SQL
                {...course}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
