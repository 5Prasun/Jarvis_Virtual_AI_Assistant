import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import moment from "moment";
import axios from "axios";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "Get current user error" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    const assistantImage = req.file
      ? await uploadOnCloudinary(req.file.path)
      : imageUrl;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Update assistant error: user error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    if (!command || command.trim() === "") {
      return res.status(400).json({ response: "Please enter a command." });
    }

    // Save user command to history
    const user = await User.findById(req.userId);
    user.history.push(command);
    await user.save();

    const userName = user.name;
    const assistantName = user.assistantName || "Assistant";

    // ✅ Use OpenAI GPT
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({
        type: "general",
        userInput: command,
        response: "OpenAI API key not configured on server.",
      });
    }

    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `You are a virtual assistant named ${assistantName} for ${userName}. Respond in JSON format like this:
{
  "type": "general",
  "userInput": "<original command>",
  "response": "<short response>"
}
User input: ${command}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let result;
    const text = openaiRes.data.choices[0].message.content;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        type: "general",
        userInput: command,
        response: text
      };
    }

    // Handle system commands
    switch (result.type) {
      case "get-date":
        result.response = moment().format("YYYY-MM-DD");
        break;
      case "get-time":
        result.response = moment().format("hh:mm A");
        break;
      case "get-day":
        result.response = moment().format("dddd");
        break;
      case "get-month":
        result.response = moment().format("MMMM");
        break;
    }

    return res.json(result);
  } catch (error) {
    console.error("Ask assistant error:", error.message);
    return res
      .status(500)
      .json({ response: "Something went wrong while talking to GPT." });
  }
};
