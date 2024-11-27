import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSupplierServices,
  editSupplierService,
  addSupplierService,
} from "../../services/supplierService";

export const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSupplierApi.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
  },
});
// Lấy danh sách loại sản phẩm
export const getAllSupplierApi = createAsyncThunk(
  "supplier/getAllSupplier",
  async () => {
    const respone = await getAllSupplierServices();
    return respone.data;
  }
);
//Thêm mới một sản phẩm
export const addSupplierApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await addSupplierService(formData);

      await dispatch(getAllSupplierApi());
      navigate("/admin/suppliers");
    } catch (error) {
      console.log(error);
    }
  };
};
//Chỉnh sửa nhà cung cấp
export const editSupplierApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await editSupplierService(formData);

      dispatch(getAllSupplierApi());
      navigate("/admin/suppliers");
    } catch (error) {
      console.log(error);
    }
  };
};