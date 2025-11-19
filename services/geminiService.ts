import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // In a real app, ensure the key exists. Here we assume the environment is set up correctly.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateAuthorResponse = async (
  userMessage: string,
  context: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const systemInstruction = `
      You are an AI assistant representing the author Robert R Williams.
      Your goal is to answer questions about Robert's life, his military service, and his book "Rainbow Farm".
      
      Use the following context to answer questions accurately:
      ${context}
      
      Tone: Professional, reflective, patriotic, yet accessible.
      If the user asks about buying the book, encourage them to visit the store section of the website.
      Keep answers concise (under 100 words) unless asked for a detailed story.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I am currently having trouble connecting to my knowledge base. Please try again later.";
  }
};