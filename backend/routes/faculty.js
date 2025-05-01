// routes/faculty.js
const express = require("express");
const router = express.Router();
const Faculty = require("../models/facultyModel");
// Ensure this path is correct

// GET all faculty
router.get("/", async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch faculty list" });
  }
});

// POST new faculty
router.post("/", async (req, res) => {
  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({ error: "Name and department are required" });
  }

  try {
    const newFaculty = new Faculty({ name, department });
    const saved = await newFaculty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Error saving faculty" });
  }
});

// DELETE a faculty by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting faculty" });
  }
});

module.exports = router;
