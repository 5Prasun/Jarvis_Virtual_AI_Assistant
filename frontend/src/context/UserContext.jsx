import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";

  // State variables
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAIError] = useState("");

  // Fetch current logged-in user
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUserData(null);
    }
  };

  // Ask AI assistant for response
  const getAIResponse = async (command) => {
    if (!command || command.trim() === "") {
      return {
        type: "general",
        userInput: command,
        response: "Please enter a command.",
      };
    }

    try {
      setLoadingAI(true);
      setAIError("");

      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );

      if (!result.data || typeof result.data !== "object") {
        console.warn("AI returned invalid data:", result.data);
        return {
          type: "general",
          userInput: command,
          response: "Sorry, I couldn't get a response.",
        };
      }

      return result.data;
    } catch (error) {
      console.error("AI API error:", error);
      setAIError("Failed to get a response from AI assistant.");
      return {
        type: "general",
        userInput: command,
        response: "Sorry, I couldn't get a response.",
      };
    } finally {
      setLoadingAI(false);
    }
  };

  // Fetch current user on mount
  useEffect(() => {
    handleCurrentUser();
  }, []);

  // Context value
  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getAIResponse,
    loadingAI,
    aiError,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
