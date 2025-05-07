import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, FileText } from "lucide-react";
import jsPDF from "jspdf";

// Admin Faculty Card Component
function AdminFacultyCard({
  name,
  branch,
  feedbackCount,
  positiveCount,
  rating,
  onDelete,
  onGenerateReport,
}) {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all relative shadow-md">
      <div
        className="absolute top-4 right-4 cursor-pointer text-[#888] hover:text-red-500 transition-transform transform hover:scale-125"
        onClick={onDelete}
      >
        <Trash2 />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-sm text-[#BBBBBB] mb-1">Branch: {branch}</p>
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

// Admin Faculty Page Component
function AdminFacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: "", branch: "" });

  useEffect(() => {
    const fetchFacultyAndStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/faculty");
        const facultyList = res.data;

        const enrichedFaculty = await Promise.all(
          facultyList.map(async (item) => {
            try {
              // Fetching faculty feedback stats
              const statsRes = await axios.get(
                `http://localhost:5000/api/feedback/faculty/feedback/${item._id}/stats`
              );
              return {
                _id: item._id,
                name: item.name,
                branch: item.department,
                feedbackCount: statsRes.data.feedbackCount,
                positiveCount: statsRes.data.positiveCount,
                rating: statsRes.data.averageRating,
              };
            } catch (err) {
              console.error("Error fetching stats for faculty:", item.name, err);
              return {
                _id: item._id,
                name: item.name,
                branch: item.department,
                feedbackCount: 0,
                positiveCount: 0,
                rating: 0,
              };
            }
          })
        );

        setFaculty(enrichedFaculty);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
    };

    fetchFacultyAndStats();
  }, []);

  const handleAddFaculty = async () => {
    if (newFaculty.name && newFaculty.branch) {
      try {
        const res = await axios.post("http://localhost:5000/api/faculty", {
          name: newFaculty.name,
          department: newFaculty.branch,
        });
        const newEntry = {
          _id: res.data._id,
          name: res.data.name,
          branch: res.data.department,
          feedbackCount: 0,
          positiveCount: 0,
          rating: 0,
        };
        setFaculty((prev) => [...prev, newEntry]);
        setShowModal(false);
        setNewFaculty({ name: "", branch: "" });
      } catch (err) {
        console.error("Error adding faculty:", err);
      }
    }
  };

  const handleDelete = (index) => {
    const facultyToDelete = faculty[index];
    axios.delete(`http://localhost:5000/api/faculty/${facultyToDelete._id}`)
      .then(() => {
        const updated = [...faculty];
        updated.splice(index, 1);
        setFaculty(updated);
      })
      .catch((err) => {
        console.error("Error deleting faculty:", err);
      });
  };

  const handleGenerateReport = async (facultyMember) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Faculty Feedback Report", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Name: ${facultyMember.name}`, 20, 40);
    doc.text(`Branch: ${facultyMember.branch}`, 20, 50);
    doc.text(`Total Feedbacks: ${facultyMember.feedbackCount}`, 20, 60);
  
    // Calculate negative feedbacks
    const negativeCount = facultyMember.feedbackCount - facultyMember.positiveCount;
  
    // Display feedback counts
    doc.text(`Positive Feedbacks: ${facultyMember.positiveCount}`, 20, 70);
    doc.text(`Negative Feedbacks: ${negativeCount}`, 20, 80);
  
    // Display rating
    doc.text(`Rating: ${facultyMember.rating} ⭐`, 20, 90);  // Added rating
  
    // Fetch feedbacks from backend
    try {
      const feedbackRes = await axios.get(`http://localhost:5000/api/feedback/faculty/${facultyMember._id}`);
      const feedbacks = feedbackRes.data;
  
      const positiveFeedbacks = feedbacks.positiveFeedbacks;
      const negativeFeedbacks = feedbacks.negativeFeedbacks;
  
      let yPosition = 100; // Start position for listing feedbacks
  
      // Add Positive Feedbacks to the PDF
      doc.text("Positive Feedbacks:", 20, yPosition);
      yPosition += 10;
  
      positiveFeedbacks.forEach((feedback, index) => {
        // Use feedback.feedbackText to get the text of the feedback
        doc.text(`${index + 1}. ${feedback.feedbackText}`, 20, yPosition);
        yPosition += 5;
      });
  
      yPosition += 10; // Add space before listing negative feedbacks
  
      // Add Negative Feedbacks to the PDF
      doc.text("Negative Feedbacks:", 20, yPosition);
      yPosition += 10;
  
      negativeFeedbacks.forEach((feedback, index) => {
        // Use feedback.feedbackText to get the text of the feedback
        doc.text(`${index + 1}. ${feedback.feedbackText}`, 20, yPosition);
        yPosition += 5;
      });
  
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  
    // Save the PDF
    doc.save(`${facultyMember.name}_Feedback_Report.pdf`);
  };
  

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Manage Faculty</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-[#9333EA] hover:bg-[#7A27B6] text-white rounded-xl font-medium shadow-md transition-transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Faculty
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faculty.map((item, index) => (
            <AdminFacultyCard
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
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Add New Faculty</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-[#CCCCCC] mb-1 text-sm">Faculty Name</label>
                <input
                  type="text"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-[#9333EA] shadow-inner placeholder-gray-400"
                  placeholder="Enter faculty name"
                />
              </div>
              <div>
                <label className="block text-[#CCCCCC] mb-1 text-sm">Branch</label>
                <input
                  type="text"
                  value={newFaculty.branch}
                  onChange={(e) => setNewFaculty({ ...newFaculty, branch: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-[#9333EA] shadow-inner placeholder-gray-400"
                  placeholder="Enter branch"
                />
              </div>
              <div className="flex justify-end gap-4 pt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-[#444444] text-[#EDEDED] rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFaculty}
                  className="px-6 py-2 bg-[#9333EA] hover:bg-[#7A27B6] text-white rounded-xl font-semibold"
                >
                  Add Faculty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFacultyPage;
