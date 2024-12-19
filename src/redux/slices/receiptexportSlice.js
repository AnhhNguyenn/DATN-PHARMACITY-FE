import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllReceiptServices,
    getAllExportServices,
    addReceiptService,
    addExportService,
} from "../../services/receiptexportServices";
import { toast } from "react-toastify";

const initialState = {
    receipts: [], // State lưu trữ danh sách phiếu nhập
    exports: [],  // State lưu trữ danh sách phiếu xuất
    isLoading: false,
    error: null,
};

export const receiptexportSlice = createSlice({
    name: "receiptexport",
    initialState,
    reducers: {
        addReceiptSuccess: (state, action) => {
            state.receipts.push(action.payload); // Cập nhật state receipts với phiếu nhập mới
        },
        addExportSuccess: (state, action) => {
            state.exports.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            // Cases cho getAllReceiptApi
            .addCase(getAllReceiptApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.receipts = action.payload;
            })
            .addCase(getAllReceiptApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReceiptApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            // Cases cho getAllExportApi
            .addCase(getAllExportApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.exports = action.payload;
            })
            .addCase(getAllExportApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllExportApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

// Lấy danh sách phiếu nhập
export const getAllReceiptApi = createAsyncThunk(
    "receipt/getAllReceipt",
    async () => {
        const response = await getAllReceiptServices();
        console.log("Response from getAllReceiptServices (in slice):", response);
        return response.data;
    }
);

// Lấy danh sách phiếu xuất
export const getAllExportApi = createAsyncThunk(
    "export/getAllExport",
    async () => {
        const response = await getAllExportServices();
        return response.data;
    }
);

// Thêm mới một phiếu nhập
export const addReceiptApi = (formData) => async (dispatch) => {
    try {
        const result = await addReceiptService(formData);
        console.log("Response from addReceiptService (in slice):", result);
        toast.success(result.data.message);
        dispatch(addReceiptSuccess(result.data));
        dispatch(getAllReceiptApi());
    } catch (error) {
        toast.error("Có lỗi khi thêm phiếu nhập!");
        console.log(error);
    }
};


// Thêm mới một phiếu xuất
export const addExportApi = (formData) => async (dispatch) => {
    try {
        const result = await addExportService(formData);
        toast.success(result.data.message);
        // Cập nhật state exports ngay lập tức
        dispatch(addExportSuccess(result.data.data));
        dispatch(getAllExportApi());
    } catch (error) {
        toast.error("Có lỗi khi thêm phiếu xuất!");
        console.log(error);
    }
};

export const { addReceiptSuccess, addExportSuccess } = receiptexportSlice.actions;
export default receiptexportSlice.reducer;