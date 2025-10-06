import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error("❌ Missing GEMINI_API_KEY in environment variables");
      return {
        type: "general",
        userInput: command,
        response: "API key missing in server configuration."
      };
    }

    const prompt = `
You are a virtual assistant named ${assistantName}, created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<original user input>",
  "response": "<a short spoken response>"
}

Now your userInput is: ${command}
`;

    // ✅ Updated model URL
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent";

    const result = await axios.post(
      `${apiUrl}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Extract response text
    const text = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.warn("⚠️ Gemini returned empty or malformed response:", result.data);
      return {
        type: "general",
        userInput: command,
        response: "Sorry, I couldn't get a response."
      };
    }

    // Try parsing JSON from the assistant
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch {
      console.warn("⚠️ Gemini returned non-JSON response:", text);
      return {
        type: "general",
        userInput: command,
        response: text
      };
    }

  } catch (error) {
    console.error("❌ Gemini API error:", error.message, error.response?.data);
    return {
      type: "general",
      userInput: command,
      response: "Sorry, something went wrong while talking to Gemini."
    };
  }
};

export default geminiResponse;

