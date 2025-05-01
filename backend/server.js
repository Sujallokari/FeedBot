// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { signup, login } = require("./controllers/authController");
const feedbackRoutes = require("./routes/feedbackRoutes");
const facultyRoutes = require("./routes/faculty"); 
const courseRoutes = require("./routes/course");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // This should be a working function in config/db.js

// Routes
app.post("/api/signup", signup);
app.post("/api/login", login);
app.use("/api/faculty", facultyRoutes);  // ✅ Your frontend calls POST http://localhost:5000/api/faculty
app.use("/api/feedback", feedbackRoutes);
 // Add this
 const courseRouter = require("./routes/courseRoutes");
 app.use("/api/courses", courseRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
