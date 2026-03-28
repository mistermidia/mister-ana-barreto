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
      contents: [{ role: 'user', parts: [{ text: `Crie um conceito visual sofisticado, moderno e em alta definição (1080p/2K) para uma marca digital: ${prompt}` }] }],
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: "2K"
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

export async function generateConceptVideo(prompt: string, aspectRatio: "16:9" | "9:16" = "16:9") {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Um vídeo cinematográfico, sofisticado e em alta definição (1080p) para uma marca digital: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: aspectRatio
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
      const response = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': process.env.GEMINI_API_KEY || '',
        },
      });
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return null;
  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
}
