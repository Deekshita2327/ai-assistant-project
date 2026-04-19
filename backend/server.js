const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");

const app = express();

// ======================
// ✅ MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ✅ ROOT ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("🚀 AI Backend Running Successfully");
});

// ======================
// ✅ API ROUTES
// ======================
app.use("/api/chat", chatRoutes);

// ======================
// ✅ DATABASE CONNECTION (IMPORTANT FIX)
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ======================
// ✅ ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

// ======================
// ✅ START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🔍 ENV CHECK:");
  console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");
  console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");
});