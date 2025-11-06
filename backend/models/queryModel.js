import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  topic: { type: String, required: true },
  question: { type: String, required: true },
  reply: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Query || mongoose.model("Query", querySchema);
