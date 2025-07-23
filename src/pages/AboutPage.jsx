import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "lucide-react"; // User icon from lucide-react

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#EDEDED]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Body Content with padding to prevent overlap with fixed header */}
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Team Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-white mb-4">Team D2</h1>
            
          </div>

          {/* Team Members Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMemberCard name="Ishan Lokari" role="" />
            <TeamMemberCard name="Sujal Lokari" role="" />
            
          </div>

          {/* About FeedBot Section */}
          <div className="mt-16 text-center">
            <h1 className="text-3xl font-semibold text-white mb-4">About FeedBot</h1>
            <p className="text-lg text-[#9333EA] max-w-2xl mx-auto text-justify">
              FeedBot is a next-generation feedback management platform designed to streamline how students submit feedback for course and faculties, and how administrators analyze and act on it. With AI-powered sentiment analysis and intuitive reporting tools, FeedBot ensures that feedback is actionable and impactful for all users.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({ name, role }) {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-center space-x-5 mb-4">
        <User className="h-12 w-12 text-[#9333EA]" /> {/* User Icon */}
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-[#EDEDED] text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
