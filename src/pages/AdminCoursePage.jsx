import React, { useState, useEffect } from "react";
import { Trash2, Plus, FileText } from "lucide-react";
import jsPDF from "jspdf";
import axios from "axios";

// Admin Course Card Component
function AdminCourseCard({
  name,
  code,
  feedbackCount,
  positiveCount,
  rating,
  onDelete,
  onGenerateReport,
}) {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] relative shadow-md">
      <div
        className="absolute top-4 right-4 cursor-pointer text-[#888] hover:text-red-500 transition-transform duration-200 hover:scale-125"
        onClick={onDelete}
      >
        <Trash2 />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-base text-[#BBBBBB] mb-1">Code: {code}</p>
      <p className="text-sm text-[#BBBBBB] mb-1">Feedbacks: {feedbackCount}</p>
      <p className="text-sm text-[#BBBBBB] mb-4">Positive Feedbacks: {positiveCount}</p>
      <p className="text-sm text-[#BBBBBB] mb-4">Rating: {rating} ⭐</p>

      <button
        onClick={onGenerateReport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md transition-transform hover:scale-105"
      >
        <FileText className="w-4 h-4" />
        Feedback Report
      </button>
    </div>
  );
}

// Admin Course Page Component
function AdminCoursePage() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", code: "" });

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        const enrichedCourses = await Promise.all(
          response.data.map(async (course) => {
            try {
              // Fetching course feedback stats
              const statsRes = await axios.get(
                `http://localhost:5000/api/feedback/course/feedback/${course._id}/stats`
              );
              return {
                _id: course._id,
                name: course.name,
                code: course.code,
                feedbackCount: statsRes.data.feedbackCount,
                positiveCount: statsRes.data.positiveCount,
                rating: statsRes.data.averageRating,
              };
            } catch (err) {
              console.error("Error fetching stats for course:", course.name, err);
              return {
                _id: course._id,
                name: course.name,
                code: course.code,
                feedbackCount: 0,
                positiveCount: 0,
                rating: 0,
              };
            }
          })
        );
        setCourses(enrichedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (newCourse.name && newCourse.code) {
      try {
        const res = await axios.post("http://localhost:5000/api/courses", newCourse);
        const newEntry = {
          _id: res.data._id,
          name: res.data.name,
          code: res.data.code,
          feedbackCount: 0,
          positiveCount: 0,
          rating: 0,
        };
        setCourses((prev) => [...prev, newEntry]);
        setShowModal(false);
        setNewCourse({ name: "", code: "" });
      } catch (err) {
        console.error("Error adding course:", err);
      }
    }
  };

  const handleDelete = (index) => {
    const courseToDelete = courses[index];
    axios.delete(`http://localhost:5000/api/courses/${courseToDelete._id}`)
      .then(() => {
        const updated = [...courses];
        updated.splice(index, 1);
        setCourses(updated);
      })
      .catch((err) => {
        console.error("Error deleting course:", err);
      });
  };

  const handleGenerateReport = async (course) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Course Feedback Report", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Course Name: ${course.name}`, 20, 40);
    doc.text(`Course Code: ${course.code}`, 20, 50);
    doc.text(`Total Feedbacks: ${course.feedbackCount}`, 20, 60);
  
    // Calculate negative feedbacks
    const negativeCount = course.feedbackCount - course.positiveCount;
  
    // Display feedback counts
    doc.text(`Positive Feedbacks: ${course.positiveCount}`, 20, 70);
    doc.text(`Negative Feedbacks: ${negativeCount}`, 20, 80);
  
    // Display rating
    doc.text(`Rating: ${course.rating} ⭐`, 20, 90);  // Added rating
  
    // Fetch feedbacks from backend
    try {
      const feedbackRes = await axios.get(`http://localhost:5000/api/feedback/course/${course._id}`);
      const feedbacks = feedbackRes.data;
  
      const positiveFeedbacks = feedbacks.positiveFeedbacks;
      const negativeFeedbacks = feedbacks.negativeFeedbacks;
  
      let yPosition = 100; // Start position for listing feedbacks
  
      // Add Positive Feedbacks to the PDF
      doc.text("Positive Feedbacks:", 20, yPosition);
      yPosition += 10;
  
      positiveFeedbacks.forEach((feedback, index) => {
        doc.text(`${index + 1}. ${feedback.feedbackText}`, 20, yPosition);
        yPosition += 5;
      });
  
      yPosition += 10; // Add space before listing negative feedbacks
  
      // Add Negative Feedbacks to the PDF
      doc.text("Negative Feedbacks:", 20, yPosition);
      yPosition += 10;
  
      negativeFeedbacks.forEach((feedback, index) => {
        doc.text(`${index + 1}. ${feedback.feedbackText}`, 20, yPosition);
        yPosition += 5;
      });
  
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  
    // Save the PDF
    doc.save(`${course.name}_Feedback_Report.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Manage Courses</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-[#9333EA] hover:bg-[#7A27B6] text-white rounded-xl font-medium shadow-md transition-transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Course
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((item, index) => (
            <AdminCourseCard
              key={item._id}
              {...item}
              onDelete={() => handleDelete(index)}
              onGenerateReport={() => handleGenerateReport(item)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-[#1A1A1A] border border-[#6B21A8] rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Add New Course</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-[#CCCCCC] mb-1 text-sm">Course Name</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-[#9333EA] shadow-inner placeholder-gray-400"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-[#CCCCCC] mb-1 text-sm">Course Code</label>
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-[#9333EA] shadow-inner placeholder-gray-400"
                  placeholder="Enter course code"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-[#9333EA] text-white rounded-xl font-semibold hover:bg-[#7A27B6] transition-transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="px-6 py-2 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059E4D] transition-transform hover:scale-105"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCoursePage;
