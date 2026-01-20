import { Buffer } from "buffer"; // ✅ Manually import Buffer
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import mime from "mime-types";

// ✅ Use import.meta.env instead of process.env for Vite
const apiKey = "AIzaSyAJbxcLLlKB3LrRaTpDlyRtfb60awjfUtE";
if (!apiKey) {
    throw new Error("Missing API Key! Check your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
};

async function runChat(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        if (!result.response || !result.response.candidates) {
            console.error("Invalid API response");
            return null;
        }

        const candidates = result.response.candidates;
        for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
            for (let partIndex = 0; partIndex < candidates[candidateIndex].content.parts.length; partIndex++) {
                const part = candidates[candidateIndex].content.parts[partIndex];
                if (part.inlineData) {
                    try {
                        const filename = `output_${candidateIndex}_${partIndex}.${mime.extension(part.inlineData.mimeType)}`;
                        fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
                        console.log("File saved:", filename);
                    } catch (err) {
                        console.error("Error saving file:", err);
                    }
                }
            }
        }

        console.log("Response:", result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("Error in runChat:", error);
        return null;
    }
}

export default runChat;
