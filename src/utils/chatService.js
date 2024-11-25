import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAA-VHv9Il0_iSEhXmXAS1QT5pw-Qm7BxM');

export async function getChatResponse(message) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(message);
        const response = await result.response;
        const rawText = response.text();

        // Trả về nội dung nguyên văn từ API
        return rawText;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}