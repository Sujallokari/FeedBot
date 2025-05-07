import React, { useEffect, useState } from "react";
import { Lock, Mail, School, UserCircle2 } from "lucide-react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const adminStatus = sessionStorage.getItem("isAdmin");
    if (token && adminStatus) {
      setAlreadyLoggedIn(true);
      setIsAdmin(adminStatus === "true");
    }

    window.onbeforeunload = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAdmin");
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    setAlreadyLoggedIn(false);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isAdmin }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("isAdmin", data.isAdmin);

          if (data.isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        } else {
          setError("No token received. Please try again.");
        }
      } else {
        const data = await response.json();
        setError(data.message || "Failed to log in.");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 pt-24">
        {alreadyLoggedIn ? (
          <div className="w-full max-w-md p-6 sm:p-8 rounded-xl border border-[#9333EA] bg-[#1A1A1A] text-white text-center">
            <School className="h-10 w-10 sm:h-12 sm:w-12 text-[#9333EA] mx-auto" />
            <h2 className="text-xl sm:text-2xl font-bold mt-4">You're already logged in!</h2>
            <p className="text-xs sm:text-sm text-[#EDEDED] mt-2">Enjoy your dashboard access.</p>

            <button
              onClick={() => {
                if (isAdmin) {
                  navigate("/admin/dashboard");
                } else {
                  navigate("/user/dashboard");
                }
              }}
              className="w-full mt-6 py-2 bg-[#9333EA] hover:bg-[#7A27B6] text-white rounded-xl transition-all"
            >
              Go to Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full mt-2 py-2 border border-[#9333EA] text-red-600 hover:bg-red-600 hover:border-white hover:text-white rounded-xl transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            className={`w-full max-w-md p-6 sm:p-8 rounded-xl border ${isAdmin ? "border-white" : "border-[#6B21A8]"} bg-[#1A1A1A] hover:border-[#9333EA] transition-all transform hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="text-center">
              <div className="flex justify-center">
                <School className={`h-10 w-10 sm:h-12 sm:w-12 ${isAdmin ? "text-white" : "text-[#9333EA]"}`} />
              </div>
              <h2 className={`mt-6 text-2xl sm:text-3xl font-bold ${isAdmin ? "text-[#9333EA]" : "text-white"}`}>
                Welcome back to FeedBot
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#EDEDED]">
                {isAdmin ? "Admin Portal Access" : "Sign in to your account"}
              </p>
            </div>

            {error && (
              <div className="text-center text-xs sm:text-sm text-red-500 mt-4">{error}</div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                    className={`block w-full pl-10 pr-3 py-2 border ${isAdmin ? "border-white" : "border-[#6B21A8]"} rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:border-transparent text-sm`}
                    placeholder="Email address"
                  />
                </div>

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
                    className={`block w-full pl-10 pr-3 py-2 border ${isAdmin ? "border-white" : "border-[#6B21A8]"} rounded-xl bg-[#1A1A1A] text-white placeholder-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:border-transparent text-sm`}
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="flex items-center space-x-2 text-sm text-[#9333EA] hover:text-[#7A27B6]"
                >
                  <UserCircle2 className="h-5 w-5" />
                  <span>{isAdmin ? "Switch to User Login" : "Login as Admin"}</span>
                </button>

                {!isAdmin && (
                  <Link to="/signup" className="text-sm text-[#9333EA] hover:text-[#7A27B6]">
                    Don't have an account? Signup
                  </Link>
                )}
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9333EA] ${isAdmin ? "bg-white text-[#9333EA] hover:bg-[#f3e8ff]" : "bg-[#9333EA] text-white hover:bg-[#7A27B6]"}`}
              >
                Sign in
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
