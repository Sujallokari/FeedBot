import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import FacultyPage from './pages/FacultyPage';
import CoursePage from './pages/CoursePage';
import AdminDashboard from './pages/AdminDashboard';

import AdminCoursePage from "./pages/AdminCoursePage";
import AdminFacultyPage from "./pages/AdminFacultyPage";
import Signup from './components/Signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/User/dashboard" element={<UserDashboard />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/Admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCoursePage />} />
        <Route path="/admin/faculty" element={<AdminFacultyPage />} />

        
        
       
      </Routes>
    </Router>
  );
}

export default App;
