import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addProductService,
    changeStatusProductService,
    editProductService,
    getAllProductService,
    deleteProduct
} from "../../services/productService";

export const getAllProductsApi = createAsyncThunk(
    "product/getAllProducts",
    async ({ pageNumber, pageSize }, { rejectWithValue }) => {
        try {
            const response = await getAllProductService({ pageNumber, pageSize });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addProductApi = createAsyncThunk(
    "product/addProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await addProductService(formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editProductApi = createAsyncThunk(
    "product/editProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await editProductService(formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProductApi = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await deleteProduct(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeStatusProductApi = createAsyncThunk(
    "product/changeStatus",
    async ({ idProduct, status_number }, { rejectWithValue }) => {
        try {
            const response = await changeStatusProductService(idProduct, status_number);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        totalItems: 0,
        loading: false,
        error: null,
        currentPage: 1,
        pageSize: 8
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Products
            .addCase(getAllProductsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProductsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.items;
                state.totalItems = action.payload.total;
                state.error = null;
            })
            .addCase(getAllProductsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Product
            .addCase(addProductApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductApi.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.error = null;
            })
            .addCase(addProductApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Edit Product
            .addCase(editProductApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProductApi.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    product => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(editProductApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Product
            .addCase(deleteProductApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductApi.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    product => product.id !== action.payload
                );
                state.error = null;
            })
            .addCase(deleteProductApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Change Status
            .addCase(changeStatusProductApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeStatusProductApi.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    product => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index].status = action.payload.status;
                }
                state.error = null;
            })
            .addCase(changeStatusProductApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;