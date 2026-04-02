import { createContext, useEffect, useRef, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const timeoutsRef = useRef([]);

  const clearTypingTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => clearTypingTimers, []);

  const startTypingEffect = (text) => {
    clearTypingTimers();
    setResultData("");

    const chunks = text.match(/\S+\s*/g) ?? [text];

    chunks.forEach((chunk, index) => {
      const timeoutId = setTimeout(() => {
        setResultData((prev) => prev + chunk);
      }, 40 * index);

      timeoutsRef.current.push(timeoutId);
    });
  };

  const resetChat = () => {
    clearTypingTimers();
    setInput("");
    setRecentPrompt("");
    setPrevPrompts([]);
    setShowResult(false);
    setLoading(false);
    setResultData("");
  };

  const onSent = async (promptText, options = {}) => {
    const prompt = promptText?.trim();
    if (!prompt) return;

    const shouldSavePrompt = options.savePrompt ?? true;

    clearTypingTimers();
    setInput("");
    setLoading(true);
    setRecentPrompt(prompt);
    setShowResult(true);
    setResultData("");

    try {
      const response = await fetch("/api/chat", {
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
      const responseText = data?.text;

      if (!responseText) {
        setResultData("Sorry, something went wrong or quota was reached.");
        return;
      }

      startTypingEffect(responseText);

      if (shouldSavePrompt) {
        setPrevPrompts((prev) =>
          prev.includes(prompt) ? prev : [prompt, ...prev].slice(0, 10)
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setResultData("Error: Unable to get a response.");
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
    resetChat,
    showResult,
    loading,
    resultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
