import requestApi from "../utils/requestApi";

export const getAllReceiptServices = async () => {
    try {
        const respone = await requestApi({
            url: "receiptexport/receipts/all",
            method: "get",
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getAllExportServices = async () => {
    try {
        const respone = await requestApi({
            url: "receiptexport/exports/all",
            method: "get",
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const addReceiptService = (formData) => {
    return requestApi({
        url: "receiptexport/receipt",
        method: "post",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        },
    });
};

export const addExportService = (formData) => {
    return requestApi({
        url: "receiptexport/export",
        method: "post",
        data: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        },
    });
};