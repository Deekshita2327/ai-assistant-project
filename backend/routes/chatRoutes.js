const express = require("express");
const router = express.Router();

const Chat = require("../models/chat");
const groqService = require("../services/groqService");

router.post("/", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question required" });
  }
try {
  const answer = await groqService.getAIResponse(question);

  if (!answer) {
    return res.status(500).json({ error: "No response from AI" });
  }

  await Chat.create({ question, answer });

  return res.json({ answer });

} catch (err) {
  console.error("ROUTE ERROR:", err.message);
  return res.status(500).json({ error: "Server error" });
}
});

module.exports = router;