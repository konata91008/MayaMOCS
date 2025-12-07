
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Translates any input text to English using Gemini.
 */
export const translateToEnglish = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following text into English.
      
      Requirements:
      1. Translate accurately and completely. Do NOT summarize or omit any details (e.g., locations, time, activities).
      2. Output ONLY the English translation.
      3. Do not wrap the output in quotes.
      
      Text to translate:
      ${text}`,
      config: {
        temperature: 0.1,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation failed.");
  }
};

/**
 * Translates English text to a specific target language using Gemini.
 */
export const translateToTargetLanguage = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following English text to ${targetLanguage}.
      
      Requirements:
      1. Output ONLY the translation.
      2. Do not wrap the output in quotes.
      3. Use natural, native phrasing for the target language.
      
      Text to translate:
      ${text}`,
      config: {
        temperature: 0.1,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation failed.");
  }
};
