import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAA-VHv9Il0_iSEhXmXAS1QT5pw-Qm7BxM');

// Câu hỏi lập trình sẵn
const predefinedQA = {
    "Làm sao để đặt hàng?": `<div class="chat-content">
        <div>Để đặt hàng, bạn có thể thực hiện theo các bước sau:</div>
        <div class="category-item">1. Chọn sản phẩm và thêm vào giỏ hàng</div>
        <div class="category-item">2. Nhấn vào biểu tượng giỏ hàng</div>
        <div class="category-item">3. Kiểm tra đơn hàng và nhấn "Thanh toán"</div>
        <div class="category-item">4. Điền thông tin giao hàng</div>
        <div class="category-item">5. Chọn phương thức thanh toán và hoàn tất đơn hàng</div>
    </div>`,

    "Chính sách đổi trả như thế nào?": `<div class="chat-content">
        <div>Chính sách đổi trả của chúng tôi:</div>
        <div class="category-item">- Thời gian đổi trả: trong vòng 7 ngày</div>
        <div class="category-item">- Sản phẩm còn nguyên vẹn, đầy đủ tem nhãn</div>
        <div class="category-item">- Có hóa đơn mua hàng</div>
    </div>`,

    "Thời gian giao hàng mất bao lâu?": `<div class="chat-content">
        <div>Thời gian giao hàng dự kiến:</div>
        <div class="category-item">- Nội thành: 1-2 ngày</div>
        <div class="category-item">- Ngoại thành: 2-3 ngày</div>
        <div class="category-item">- Tỉnh thành khác: 3-5 ngày</div>
    </div>`
};

export const getSuggestedQuestions = () => {
    return Object.keys(predefinedQA);
};

export async function getChatResponse(message) {
    try {

        // Kiểm tra nếu là câu hỏi có sẵn
        if (predefinedQA[message]) {
            return predefinedQA[message];
        }

        // Nếu không phải câu hỏi có sẵn, gọi API Gemini
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