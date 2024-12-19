import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllReceiptServices, getAllExportServices, addReceiptService, addExportService } from "../../services/receiptexportServices";
import { toast } from 'react-toastify';

export const receiptexportSlice = createSlice({
    name: "receiptexport",
    initialState: {
        receiptexports: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReceiptApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.receiptexports = action.payload;
            })
            .addCase(getAllReceiptApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReceiptApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getAllExportApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.receiptexports = action.payload;
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

// Lấy danh sách loại sản phẩm
export const getAllReceiptApi = createAsyncThunk(
    "receipt/getAllReceipt",
    async () => {
        const respone = await getAllReceiptServices();
        return respone.data;
    }
);

// Lấy danh sách loại sản phẩm
export const getAllExportApi = createAsyncThunk(
    "export/getAllExport",
    async () => {
        const respone = await getAllExportServices();
        return respone.data;
    }
);

//Thêm mới một sản phẩm
export const addReceiptApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await addReceiptService(formData);
            toast.success(result.data.message);
            await dispatch(getAllReceiptApi());
            navigate("admin/warehouse-receipt");
        } catch (error) {
            toast.error("Có lỗi khi thêm phiếu nhập!");
            console.log(error);
        }
    };
};

//Thêm mới một sản phẩm
export const addExportApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await addExportService(formData);
            toast.success(result.data.message);
            await dispatch(getAllExportApi());
            navigate("/admin/warehouse-export");
        } catch (error) {
            toast.error("Có lỗi khi thêm phiếu xuất!");
            console.log(error);
        }
    };
};

export const { setReceiptexports } = receiptexportSlice.actions;

export default receiptexportSlice.reducer;