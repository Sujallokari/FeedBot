import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, Star, Users } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleStartFeedback = () => {
    if (isAuthenticated) {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Body Content with padding to prevent overlap with fixed header */}
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Course & Faculty Feedback Made Simple
            </h1>
            <p className="text-lg text-[#9333EA] mb-8 max-w-xl mx-auto">
              Collect and analyze student feedback efficiently with our streamlined platform.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleStartFeedback}
              className="inline-block bg-[#9333EA] text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-[#7A27B6] transition-colors mt-6"
            >
              Start Giving Feedback
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-[#9333EA]" />}
              title="Easy Collection"
              description="Simple feedback forms for courses and faculty."
            />
            <FeatureCard
              icon={<Star className="h-6 w-6 text-[#9333EA]" />}
              title="Quick Analysis"
              description="Instant insights from student responses."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-[#9333EA]" />}
              title="Anonymous"
              description="Secure and private feedback system."
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#1A1A1A] p-7 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#EDEDED] text-sm">{description}</p>
    </div>
  );
}

export default HomePage;
