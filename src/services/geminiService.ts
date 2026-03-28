import { GoogleGenAI } from "@google/genai";

export async function generateStrategyResponse(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "Você é um assistente de estratégia digital para a Ana Barreto Digital. Ajude clientes com ideias de conteúdo, roteiros de vídeo e dicas de engajamento. Seja profissional, criativo e sofisticado. Se o usuário pedir para ver um conceito visual ou imagem, sugira que ele use a ferramenta de geração de imagem (ícone de câmera/imagem).",
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating strategy:", error);
    return "Desculpe, tive um problema ao processar sua solicitação. Verifique se a sua chave de API está configurada corretamente.";
  }
}

export async function generateConceptImage(prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1") {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: [{ role: 'user', parts: [{ text: `Crie um conceito visual sofisticado e moderno para uma marca digital: ${prompt}` }] }],
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
