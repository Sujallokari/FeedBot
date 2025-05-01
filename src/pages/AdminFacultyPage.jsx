import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, FileText } from "lucide-react";
import jsPDF from "jspdf";

function AdminFacultyCard({ name, branch, feedbackCount, positiveCount, rating, onDelete, onGenerateReport }) {
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

function AdminFacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: "", branch: "" });

  // Fetch faculty from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/faculty")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          _id: item._id,
          name: item.name,
          branch: item.department,
          feedbackCount: 0,
          positiveCount: 0,
          rating: 0
        }));
        setFaculty(formatted);
      })
      .catch((err) => {
        console.error("Error fetching faculty:", err);
      });
  }, []);

  const handleAddFaculty = () => {
    if (newFaculty.name && newFaculty.branch) {
      axios.post("http://localhost:5000/api/faculty", {
        name: newFaculty.name,
        department: newFaculty.branch,
      })
      .then((res) => {
        const newEntry = {
          _id: res.data._id,
          name: res.data.name,
          branch: res.data.department,
          feedbackCount: 0,
          positiveCount: 0,
          rating: 0
        };
        setFaculty([...faculty, newEntry]);
        setShowModal(false);
        setNewFaculty({ name: "", branch: "" });
      })
      .catch((err) => {
        console.error("Error adding faculty:", err);
      });
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

  const handleGenerateReport = (facultyMember) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Faculty Feedback Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Faculty Name: ${facultyMember.name}`, 20, 40);
    doc.text(`Branch: ${facultyMember.branch}`, 20, 50);
    doc.text(`Total Feedbacks: ${facultyMember.feedbackCount}`, 20, 60);
    doc.text(`Positive Feedbacks: ${facultyMember.positiveCount}`, 20, 70);
    doc.text(`Rating: ${facultyMember.rating} ⭐`, 20, 80);

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

      {/* Modal */}
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
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition-all shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFaculty}
                  className="px-4 py-2 rounded-xl bg-[#6B21A8] hover:bg-[#9333EA] text-white transition-all shadow-md"
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
