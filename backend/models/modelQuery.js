const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  fullName: String,
  topic: String,
  question: String,
  reply: String // ✅ Add this line
});

module.exports = mongoose.model('Query', querySchema);
