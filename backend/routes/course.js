const express = require("express");
const router = express.Router();
const Course = require("../models/courseModel");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: "No courses found" });
    }
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// POST new course
router.post("/", async (req, res) => {
  const { name, code } = req.body;

  // Validate input
  if (!name || !code) {
    return res.status(400).json({ error: "Name and code are required" });
  }

  try {
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ error: "Course with this code already exists" });
    }

    const newCourse = new Course({ name, code });
    const saved = await newCourse.save();
    res.status(201).json({
      message: "Course created successfully",
      course: saved,
    });
  } catch (err) {
    console.error("Error saving course:", err);
    res.status(500).json({ error: "Error saving course" });
  }
});

// DELETE a course by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({
      message: "Course deleted successfully",
      courseId: req.params.id,
    });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Error deleting course" });
  }
});

module.exports = router;
