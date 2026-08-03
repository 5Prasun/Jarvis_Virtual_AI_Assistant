import axios from "axios";

export const ollamaResponse = async (command, assistantName, userName) => {
  try {
    const baseUrl = process.env.OLLAMA_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL || "llama3.2";

    const prompt = `You are a voice assistant named ${assistantName}, created by ${userName}.

Understand the user's command and reply with ONLY a JSON object with keys "type", "userInput", "response" (real values, never write the literal words "string" or "object" as a value).

"type" must be exactly one of: general, google-search, youtube-search, youtube-play, get-time, get-date, get-day, get-month, calculator-open, instagram-open, facebook-open, weather-show

Examples:
User: "what time is it" -> {"type": "get-time", "userInput": "what time is it", "response": "Sure, let me check the time."}
User: "what's today's date" -> {"type": "get-date", "userInput": "what's today's date", "response": "Let me check today's date."}
User: "what day is it today" -> {"type": "get-day", "userInput": "what day is it today", "response": "Let me check the day."}
User: "what's the weather like" -> {"type": "weather-show", "userInput": "what's the weather like", "response": "Let me check the weather for you."}
User: "what is the capital of france" -> {"type": "general", "userInput": "what is the capital of france", "response": "The capital of France is Paris."}
User: "play shape of you on youtube" -> {"type": "youtube-play", "userInput": "play shape of you on youtube", "response": "Playing Shape of You on YouTube now."}
User: "search cats on google" -> {"type": "google-search", "userInput": "cats", "response": "Here's what I found on Google."}
User: "open instagram" -> {"type": "instagram-open", "userInput": "open instagram", "response": "Opening Instagram."}

Rules:
- "userInput" is the user's original command, with the assistant's name removed if present
- "response" is a short, spoken-style reply. For get-time/get-date/get-day/get-month/weather-show, do NOT make up an actual value (you have no real-time data) — just acknowledge you're checking
- Use "general" for factual or informational questions, including ones you know the answer to (answer briefly)
- Output only the JSON object, nothing else

User command: ${command}`;

    const { data } = await axios.post(`${baseUrl}/api/chat`, {
      model,
      stream: false,
      format: "json",
      messages: [
        {
          role: "system",
          content:
            'Output only a single valid JSON object with keys "type", "userInput", "response". Never use the literal words "string" or "object" as values.',
        },
        { role: "user", content: prompt },
      ],
    });

    return data.message?.content;
  } catch (err) {
    console.error("🔥 FULL ERROR:", err.response?.data || err.message || err);

    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "AI error, try again.",
    });
  }
};
