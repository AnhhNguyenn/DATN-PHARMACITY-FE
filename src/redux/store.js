import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { userSlice } from "./slices/userSlice";
import { productSlice } from "./slices/productSlice";
import globalSlice from "./slices/globalSlice";
import { categorySlice } from "./slices/categorySlice";
import orderSlice from "./slices/orderSlice";
import { promotionSlice } from "./slices/promotionSlice";
import { supplierSlice } from "./slices/supplierSlice";
import { warehouseSlice } from "./slices/warehouseSlice";
import { receiptexportSlice } from "./slices/receiptexportSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice,
    product: productSlice.reducer,
    globalSlice,
    category: categorySlice.reducer,
    orderSlice,
    promotion: promotionSlice.reducer,
    supplier: supplierSlice.reducer,
    warehouse: warehouseSlice.reducer,
    receiptexport: receiptexportSlice.reducer,
  },
});

export default store;
