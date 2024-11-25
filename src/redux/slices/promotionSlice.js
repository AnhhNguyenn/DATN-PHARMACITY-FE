import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPromotionServices,
  editPromotionService,
  addPromotionService,
} from "../../services/promotionServices";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotions: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPromotionApi.fulfilled, (state, action) => {
      state.promotions = action.payload;
    });
  },
});

export const getAllPromotionApi = createAsyncThunk(
  "promotion/getAllPromotion",
  async () => {
    const respone = await getAllPromotionServices();
    return respone.data;
  }
);

export const addPromotionApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await addPromotionService(formData);

      await dispatch(getAllPromotionApi());
      navigate("/admin/promotions");
    } catch (error) {
      console.log(error);
    }
  };
};

export const editPromotionApi = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await editPromotionService(formData);
      dispatch(getAllPromotionApi());
      navigate("/admin/promotions");
    } catch (error) {
      console.log(error);
    }
  };
};