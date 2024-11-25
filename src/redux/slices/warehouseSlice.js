import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllWarehouseServices,
  editWarehouseService,
  addWarehouseService,
} from "../../services/warehouseService";

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouses: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWarehouseApi.fulfilled, (state, action) => {
      state.warehouses = action.payload;
    });
  },
});
// Lấy danh sách loại sản phẩm
export const getAllWarehouseApi = createAsyncThunk(
  "warehouse/getAllwarehouse",
  async () => {
    const respone = await getAllWarehouseServices();
    return respone.data;
  }
);
//Thêm mới một sản phẩm
export const addWarehouseApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await addWarehouseService(formData);

      await dispatch(getAllWarehouseServices());
      navigate("/admin/warehouses");
    } catch (error) {
      console.log(error);
    }
  };
};
//Chỉnh sửa loại sản phẩm
export const editWarehouseApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await editWarehouseService(formData);
      dispatch(getAllWarehouseServices());
      navigate("/admin/warehouses");
    } catch (error) {
      console.log(error);
    }
  };
};