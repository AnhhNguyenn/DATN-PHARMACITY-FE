import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllReceiptServices, getAllExportServices, addReceiptService, addExportService } from "../../services/receiptexportServices";

export const receiptexportSlice = createSlice({
    name: "receiptexport",
    initialState: {
        receiptexports: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReceiptApi.fulfilled, (state, action) => {
                state.receiptexports = action.payload;
            })
            .addCase(getAllExportApi.fulfilled, (state, action) => {
                state.receiptexports = action.payload;
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

            await dispatch(getAllReceiptApi());
            navigate("admin/warehouse-receipt");
        } catch (error) {
            console.log(error);
        }
    };
};

//Thêm mới một sản phẩm
export const addExportApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await addExportService(formData);

            await dispatch(getAllExportApi());
            navigate("/admin/warehouse-export");
        } catch (error) {
            console.log(error);
        }
    };
};

