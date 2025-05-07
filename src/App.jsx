import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import FacultyPage from "./pages/FacultyPage";
import CoursePage from "./pages/CoursePage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import AdminCoursePage from "./pages/AdminCoursePage";
import AdminFacultyPage from "./pages/AdminFacultyPage";
import Signup from "./components/Signup";
import FeaturePage from "./pages/Featurespage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requireRole="false">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireRole="true">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute requireRole="true">
              <AdminCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute requireRole="true">
              <AdminFacultyPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Courses and Faculty Routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute requireRole="false">
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty"
          element={
            <ProtectedRoute requireRole="false">
              <FacultyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
