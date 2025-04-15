import React, { useState } from "react";
import { Lock, Mail, School, UserCircle2 } from "lucide-react";
import Header from "./Header";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, isAdmin });
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 pt-24">
        <div
          className={`max-w-md w-full space-y-8 p-8 rounded-xl 
          border ${isAdmin ? "border-white" : "border-[#6B21A8]"} 
          bg-[#1A1A1A] hover:border-[#9333EA] transition-all transform hover:scale-105 hover:shadow-lg`}
        >
          <div className="text-center">
            <div className="flex justify-center">
              <School className={`h-12 w-12 ${isAdmin ? "text-white" : "text-[#9333EA]"}`} />
            </div>
            <h2 className={`mt-6 text-3xl font-bold ${isAdmin ? "text-[#9333EA]" : "text-white"}`}>
              Welcome back to FeedBot
            </h2>
            <p className="mt-2 text-sm text-[#EDEDED]">
              {isAdmin ? "Admin Portal Access" : "Sign in to your account"}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${isAdmin ? "text-white" : "text-[#9333EA]"}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 border 
                    ${isAdmin ? "border-white" : "border-[#6B21A8]"} 
                    rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] 
                    focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:border-transparent`}
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isAdmin ? "text-white" : "text-[#9333EA]"}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 border 
                    ${isAdmin ? "border-white" : "border-[#6B21A8]"} 
                    rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] 
                    focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:border-transparent`}
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsAdmin(!isAdmin)}
                className="flex items-center space-x-2 text-sm text-[#9333EA] hover:text-[#7A27B6]"
              >
                <UserCircle2 className="h-5 w-5" />
                <span>{isAdmin ? "Switch to User Login" : "Login as Admin"}</span>
              </button>

              {!isAdmin && (
                <div className="text-sm">
                  <a href="#" className="text-[#9333EA] hover:text-[#7A27B6]">
                    Don't have an account? Signup
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium 
                ${isAdmin
                  ? "bg-white text-[#9333EA] hover:bg-[#f3e8ff]"
                  : "bg-[#9333EA] text-white hover:bg-[#7A27B6]"} 
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9333EA]`}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
