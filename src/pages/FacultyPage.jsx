import React, { useEffect, useState } from "react";
import FacultyCard from "@/components/FacultyCard";
import Header from "@/components/Header";
import axios from "axios";

function FacultyPage({ isAdmin }) {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/faculty"); // API URL
        setFaculties(res.data); // Set the faculty data
      } catch (error) {
        console.error("Failed to fetch faculties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isAdmin ? "Admin: Faculty Management" : "Faculty"}
          </h1>

          {loading ? (
            <p className="text-white">Loading...</p>
          ) : faculties.length === 0 ? (
            <p className="text-white">No faculty found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {faculties.map((faculty) => (
                <FacultyCard
                  key={faculty._id} // Use unique key for each card
                  faculty={faculty} // Pass the faculty data to the card
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyPage;
