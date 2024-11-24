import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSupplierServices, editSupplierService, addSupplierService } from "../../services/categoryServices";

export const categorySlice = createSlice({
    name: "supplier",
    initialState: {
        suppliers: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSuppliersApi.fulfilled, (state, action) => {
            state.suppliers = action.payload;
        });
    },
});
// Lấy danh sách loại sản phẩm
export const getAllSuppliersApi = createAsyncThunk(
    "supplier/getAllSupplier",
    async () => {
        const respone = await getAllSupplierServices();
        return respone.data;
    }
);
//Thêm mới một sản phẩm
export const addSuppliersApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await addSupplierService(formData);

            await dispatch(getAllSuppliersApi());
            navigate("/admin/suppliers");
        } catch (error) {
            console.log(error);
        }
    };
};
//Chỉnh sửa loại sản phẩm
export const editSuppliersApi = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const result = await editSupplierService(formData);
            dispatch(getAllSuppliersApi());
            navigate("/admin/suppliers");
        } catch (error) {
            console.log(error);
        }
    };
};
