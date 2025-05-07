import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Cloud, BarChart, Users } from "lucide-react"; // Importing relevant icons

function FeaturePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Body Content with padding to prevent overlap with fixed header */}
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-20">
          {/* Features Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Features of FeedBot</h1>
            <p className="text-lg text-[#9333EA] max-w-2xl mx-auto">
              FeedBot offers powerful features to manage feedback, improve analysis, and enhance decision-making for both students and administrators.
            </p>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              title="AI-Driven Sentiment Analysis"
              description="Using advanced sentiment analysis, FeedBot automatically tags feedback as positive, neutral, or negative for better insights."
              icon={<BarChart className="text-[#9333EA] h-8 w-8" />} // Icon for sentiment analysis
            />
            <FeatureCard
              title="Real-Time Feedback"
              description="Students can provide real-time feedback on courses and faculty, helping to address concerns promptly."
              icon={<Users className="text-[#9333EA] h-8 w-8" />} // Icon for real-time feedback
            />
            <FeatureCard
              title="Admin Control Panel"
              description="Admins can manage and review all course and faculty feedback, generating actionable reports for improvement."
              icon={<Cloud className="text-[#9333EA] h-8 w-8" />} // Icon for cloud or admin control
            />
            <FeatureCard
              title="Customizable Reports"
              description="Generate detailed reports that show trends in feedback and provide valuable insights to guide decisions."
              icon={<FileText className="text-[#9333EA] h-8 w-8" />} // Icon for report generation
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-[#1A1A1A] p-7 rounded-xl border border-[#6B21A8] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white ml-4">{title}</h3>
      </div>
      <p className="text-[#EDEDED] text-sm">{description}</p>
    </div>
  );
}

export default FeaturePage;
