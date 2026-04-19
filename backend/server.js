require("dotenv").config();

console.log("🚀 Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔍 ENV CHECK:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");
console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

app.use("/api/chat", require("./routes/chatRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});