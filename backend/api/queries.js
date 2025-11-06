import mongoose from "mongoose";
import Query from "../models/queryModel.js";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
};

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  try {
    if (method === "GET") {
      const queries = await Query.find().sort({ _id: -1 });
      return res.status(200).json(queries);
    }

    if (method === "POST") {
      const { fullName, topic, question } = req.body;
      if (!fullName || !topic || !question)
        return res.status(400).json({ error: "Missing fields" });

      const newQuery = new Query({ fullName, topic, question });
      await newQuery.save();
      return res.status(201).json({ message: "Query added successfully" });
    }

    if (method === "PUT") {
      const { id, reply } = req.body;
      await Query.findByIdAndUpdate(id, { reply });
      return res.status(200).json({ message: "Reply updated successfully" });
    }

    if (method === "DELETE") {
      const { id } = req.body;
      await Query.findByIdAndDelete(id);
      return res.status(200).json({ message: "Query deleted successfully" });
    }

    res.status(405).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
