import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const askGPT = async (command, assistantName, userName) => {
  try {
    const prompt = `
      You are a virtual assistant named ${assistantName}, created by ${userName}.
      Respond in JSON format like this:
      {
        "type": "general",
        "userInput": "<original input>",
        "response": "<short spoken response>"
      }
      User input: ${command}
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const text = response.choices[0].message.content;

    try {
      return JSON.parse(text);
    } catch {
      return {
        type: "general",
        userInput: command,
        response: text
      };
    }
  } catch (error) {
    console.error("OpenAI error:", error.message);
    return {
      type: "general",
      userInput: command,
      response: "Sorry, something went wrong while talking to GPT."
    };
  }
};

export default askGPT;
