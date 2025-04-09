import React from "react";
import { BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#EDEDED]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome, Admin</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/admin/courses">
            <DashboardCard
              icon={<BookOpen className="h-8 w-8 text-[#9333EA]" />}
              title="Courses"
              description="Manage courses and view details."
            />
          </Link>

          <Link to="/admin/faculty">
            <DashboardCard
              icon={<Users className="h-8 w-8 text-[#9333EA]" />}
              title="Faculty"
              description="Manage faculty members and view information."
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description }) {
  return (
    <Card className="bg-[#1A1A1A] border border-[#6B21A8] hover:border-[#9333EA] cursor-pointer transition-all transform hover:scale-105 shadow-md rounded-2xl">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#EDEDED] text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

export default AdminDashboard;
