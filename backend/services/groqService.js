// backend/services/groqService.js
const axios = require("axios");

async function getAIResponse(question) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Answer ONLY in bullet points.\nEach point must be on a new line.\nKeep it short (4–6 points).\nDo NOT write paragraphs.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ SAFETY CHECK (prevents crash if response changes)
    const content =
      response.data?.choices?.[0]?.message?.content ||
      "No response from AI";

    return content;
  } catch (error) {
    console.error("❌ GROQ ERROR:", error.response?.data || error.message);

    // ✅ Return clean error instead of crashing server
    return "❌ AI service is temporarily unavailable. Try again.";
  }
}

module.exports = { getAIResponse };