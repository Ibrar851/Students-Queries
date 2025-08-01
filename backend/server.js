const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // ✅ Initialize Express app

// ✅ Middleware
app.use(cors());             // Enable CORS
app.use(express.json());     // Parse incoming JSON

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ibrarulhaq1226:Task123@cluster0.ygxekim.mongodb.net/studentQueriesDB')
  .then(() => console.log('✅ MongoDB connected'))
 

// ✅ Routes
const queryRoutes = require('./routes/queryRoutes');
app.use('/api/queries', queryRoutes);

// ✅ Start Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
