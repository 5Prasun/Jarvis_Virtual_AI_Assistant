import OpenAI from "openai";

export const openaiResponse = async (command, assistantName, userName) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ API key missing at runtime");
      throw new Error("Missing OpenAI API key");
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `
You are ${assistantName}, assistant of ${userName}.

Return ONLY valid JSON:
{
  "type": "string",
  "userInput": "string",
  "response": "string"
}

Command: ${command}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Return ONLY valid JSON." },
        { role: "user", content: prompt }
      ],
    });

    return completion.choices[0].message.content;

  } catch (err) {
    console.error("🔥 FULL ERROR:", err.response?.data || err.message || err);          

    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "AI error, try again.",
    });
  }
};