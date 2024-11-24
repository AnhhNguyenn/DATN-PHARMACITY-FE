import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductService,
  changeStatusProductService,
  editProductService,
  getAllProductService,
  getAllProductsToShopService,
} from "../../services/productService";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsApi.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getAllProductsToShopApi.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

// Lấy danh sách sản phẩm
export const getAllProductsApi = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await getAllProductService();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
 
export const getAllProductsToShopApi = createAsyncThunk(
  "product/getAllProductsToShop",
  async ({ pageNumber, pageSize }) => {
    try {
      const response = await getAllProductsToShopService(pageNumber, pageSize);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//Thêm mới một sản phẩm
export const addProductApi = async (formData) => {
  try {
    const result = await addProductService(formData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
// Chỉnh sửa sản phẩm
export const editProductApi = async (formData) => {
  try {
    const result = await editProductService(formData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const changeStatusProductApi = (idProduct, status_number) => {
  return async (dispatch) => {
    try {
      const result = await changeStatusProductService(idProduct, status_number);

      console.log("data", result.data);
      dispatch(getAllProductsApi());
    } catch (error) {
      console.log(error);
    }
  };
};
