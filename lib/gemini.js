import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Set it in your server environment.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });

export async function generateChatText(prompt) {
  const trimmedPrompt = prompt?.trim();

  if (!trimmedPrompt) {
    throw new Error("Missing prompt");
  }

  const result = await model.generateContent(trimmedPrompt);
  const text = result?.response?.text?.();

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  return text;
}
