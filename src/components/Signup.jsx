import React, { useState } from "react";
import { Lock, Mail, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    const user = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User created successfully");
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ><Header />
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 pt-24">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl border bg-[#1A1A1A] shadow-lg">
        <div className="text-center">
          <UserCircle2 className="h-12 w-12 mx-auto text-[#9333EA]" />
          <h2 className="mt-6 text-3xl font-bold text-white">Create Your Account</h2>
          <p className="mt-2 text-sm text-[#EDEDED]">Sign up to get started</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Name Field */}
            <div className="relative group">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-3 py-2 border border-gray-600 rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-all duration-200 group-hover:border-[#9333EA]"
                placeholder="Full Name"
              />
            </div>

            {/* Email Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#9333EA]" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 py-2 border border-gray-600 rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-all duration-200 group-hover:border-[#9333EA]"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#9333EA]" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 py-2 border border-gray-600 rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-all duration-200 group-hover:border-[#9333EA]"
                placeholder="Password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#9333EA]" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 py-2 border border-gray-600 rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#9333EA] transition-all duration-200 group-hover:border-[#9333EA]"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 rounded-xl text-white font-semibold bg-[#9333EA] hover:bg-[#7A27B6] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9333EA]"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
