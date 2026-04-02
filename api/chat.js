import { generateChatText } from "../lib/gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      res.status(400).json({ error: "Missing prompt" });
      return;
    }

    const text = await generateChatText(prompt);

    res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    const statusCode = error.message === "Empty response from Gemini" ? 502 : 500;
    res.status(statusCode).json({ error: "Failed to generate response" });
  }
}
