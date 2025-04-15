import React, { useState } from "react";
import { Trash2, Plus, FileText } from "lucide-react";
import jsPDF from "jspdf";

function AdminCourseCard({ name, code, feedbackCount, positiveCount, rating, onDelete, onGenerateReport }) {
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
      <p className="text-sm text-[#BBBBBB] mb-1">Positive Feedbacks: {positiveCount}</p>
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

function AdminCoursePage() {
  const [courses, setCourses] = useState([
    { name: "Course 1", code: "CS101", feedbackCount: 20, positiveCount: 15, rating: 4.5 },
    { name: "Course 2", code: "CS102", feedbackCount: 18, positiveCount: 13, rating: 4.1 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", code: "" });

  const handleDelete = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code) {
      setCourses([
        ...courses,
        { ...newCourse, feedbackCount: 0, positiveCount: 0, rating: 0 },
      ]);
      setShowModal(false);
      setNewCourse({ name: "", code: "" });
    }
  };

  const handleGenerateReport = (course) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Course Feedback Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Course Name: ${course.name}`, 20, 40);
    doc.text(`Course Code: ${course.code}`, 20, 50);
    doc.text(`Total Feedbacks: ${course.feedbackCount}`, 20, 60);
    doc.text(`Positive Feedbacks: ${course.positiveCount}`, 20, 70);
    doc.text(`Rating: ${course.rating} ⭐`, 20, 80);

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
          {courses.map((course, index) => (
            <AdminCourseCard
              key={index}
              {...course}
              onDelete={() => handleDelete(index)}
              onGenerateReport={() => handleGenerateReport(course)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
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
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition-all shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="px-4 py-2 rounded-xl bg-[#6B21A8] hover:bg-[#9333EA] text-white transition-all shadow-md"
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
