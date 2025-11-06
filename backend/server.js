const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load environment variables

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB (using .env variable)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Routes
const queryRoutes = require("./routes/queryRoutes.js");
app.use("/api/queries", queryRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
