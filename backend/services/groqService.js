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
              "You are a helpful assistant. Always answer in clear, concise bullet points. Use 4–6 short points. Avoid long paragraphs.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.4, // more consistent, less random
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GROQ ERROR:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getAIResponse };