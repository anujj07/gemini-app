import { createContext, useState } from "react";

const Context = createContext();
const GEMINI_API_KEY = 'AIzaSyDWHKj2a3_epi7Bz_FuaO0474fZpj4jtBk'; // Replace with your actual Gemini API key

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [responseArray, setResponseArray] = useState([]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (promptText) => {
    const prompt = promptText?.trim();
    if (!prompt) return;

    setInput("");
    setLoading(true);
    setRecentPrompt(prompt);
    setPrevPrompts(prev=>[...prev,input])
    setResultData(""); // Clear old data before typing effect

    try {
      // Call your backend instead of Gemini API directly
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const responseText = data.text;

      if (!responseText) {
        setResultData("⚠️ Sorry, something went wrong or quota was reached.");
        setResponseArray([]);
        return;
      }

      // Formatting response
      const parts = responseText.split("**").map((part) => part.trim());
      let newResponse = "";

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 1) {
          newResponse += `<b>${parts[i]}</b>`;
        } else {
          newResponse += parts[i];
        }
      }

      newResponse = newResponse.split("*").join("<br />");
      const newResponseArray = newResponse.split(" ");

      //typing effect
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setResponseArray(parts.filter(Boolean));
      setPrevPrompts((prev) => [...prev, prompt]);
      setShowResult(true);
    } catch (error) {
      console.error("❌ Error during API call:", error);
      setResultData("❌ Error: Unable to get a response.");
      setResponseArray([]);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
    responseArray,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
