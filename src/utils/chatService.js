import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAA-VHv9Il0_iSEhXmXAS1QT5pw-Qm7BxM');

export async function getChatResponse(message) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(message);
        const response = await result.response;
        let rawText = response.text();

        // Format lại output
        // 1. Xử lý phần Trang phục
        rawText = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 2. Tách các mục thành danh sách
        const sections = rawText.split('\n').filter(line => line.trim());

        // 3. Tạo HTML có format
        let formattedHtml = '<div class="chat-content">';

        sections.forEach(section => {
            if (section.startsWith('**')) {
                // Đây là tiêu đề
                formattedHtml += `<div class="category-title">${section}</div>`;
            } else if (section.startsWith('* ')) {
                // Đây là item trong danh sách
                formattedHtml += `<div class="category-item">${section.substring(2)}</div>`;
            } else {
                formattedHtml += `<div>${section}</div>`;
            }
        });

        formattedHtml += '</div>';

        return formattedHtml;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}