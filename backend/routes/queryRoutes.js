const express = require("express");
const router = express.Router();
const Query = require("../models/queryModel");

// ✅ Get all queries
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find().sort({ _id: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch queries" });
  }
});

// ✅ Add new query
router.post("/", async (req, res) => {
  try {
    console.log("📩 Received Data:", req.body); // 👈 ADD THIS LINE

    const { fullName, topic, question } = req.body;
    if (!fullName || !topic || !question) {
      return res.status(400).json({ error: "Missing fields in request" });
    }

    const newQuery = new Query({ fullName, topic, question });
    await newQuery.save();

    res.status(201).json({ message: "Query added successfully" });
  } catch (err) {
    console.error(" Error saving query:", err);
    res.status(500).json({ error: "Failed to add query" });
  }
});



// ✅ Update reply
router.put("/:id", async (req, res) => {
  try {
    const { reply } = req.body;
    await Query.findByIdAndUpdate(req.params.id, { reply });
    res.json({ message: "Reply updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update reply" });
  }
});

// ✅ Delete query
router.delete("/:id", async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ message: "Query deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete query" });
  }
});

module.exports = router;
