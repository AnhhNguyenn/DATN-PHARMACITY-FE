import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAA-VHv9Il0_iSEhXmXAS1QT5pw-Qm7BxM');

const formatResponse = (text) => {
    // Tách các phần bằng ** và loại bỏ phần rỗng
    const sections = text.split('**').filter(Boolean);

    // Xử lý từng phần
    const formattedSections = sections.map(section => {
        // Nếu không chứa *, đây là tiêu đề
        if (!section.includes('*')) {
            return `\n${section.trim()}:`;
        }

        // Nếu chứa *, đây là danh sách
        const points = section.split('*').filter(Boolean);

        // Format danh sách gọn gàng
        const formattedPoints = points.map(point => `- ${point.trim()}`).join('\n');
        return formattedPoints;
    });

    // Thêm cách dòng giữa các phần
    return formattedSections.join('\n\n');
};

export async function getChatResponse(message) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(message);
        const response = await result.response;
        const rawText = response.text();

        // Format the response before returning
        const formattedText = formatResponse(rawText);
        return formattedText;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}