import Anthropic from "@anthropic-ai/sdk";

export const claudeResponse = async (command, assistantName, userName) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("❌ Anthropic API key missing at runtime");
      throw new Error("Missing Anthropic API key");
    }

    const client = new Anthropic({ apiKey });

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

    const message = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      system: "Return ONLY valid JSON.",
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    return textBlock?.text;
  } catch (err) {
    console.error("🔥 FULL ERROR:", err.response?.data || err.message || err);

    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "AI error, try again.",
    });
  }
};
