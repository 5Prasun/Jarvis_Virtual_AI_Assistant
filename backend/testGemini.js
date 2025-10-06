// testGemini.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // load your GEMINI_API_KEY from .env

const testGemini = async () => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in .env");
    return;
  }

  const prompt = `
Respond in JSON format like:
{
  "type": "general",
  "userInput": "test",
  "response": "This is a test response"
}

User input: "Hello, Gemini!"
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Full Gemini response:");
    console.log(JSON.stringify(res.data, null, 2));

    const text = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("\n📄 Extracted text:");
    console.log(text);
  } catch (err) {
    console.error("❌ Error calling Gemini API:", err.response?.data || err.message);
  }
};

testGemini();
