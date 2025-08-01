const express = require('express');
const router = express.Router();
const Query = require('../models/modelQuery');

// Get all queries
router.get('/', async (req, res) => {
  const queries = await Query.find().sort({ createdAt: -1 });
  res.json(queries);
});

// Add new query
router.post('/', async (req, res) => {
  const { fullName, topic, question } = req.body;
  const newQuery = new Query({ fullName, topic, question });
  await newQuery.save();
  res.json(newQuery);
});

// Update query
router.put('/:id', async (req, res) => {
  const updated = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete query
router.delete('/:id', async (req, res) => {
  await Query.findByIdAndDelete(req.params.id);
  res.json({ message: 'Query deleted' });
});

module.exports = router;
