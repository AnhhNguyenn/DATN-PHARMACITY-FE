import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import User from "./pages/User/User";
import Promotion from "./pages/Promotion/Promotion";
import Supplier from "./pages/Supplier/Supplier";
import Warehouse from "./pages/Warehouse/Warehouse";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme/theme";
import InputProduct from "./pages/Product/InputProduct";
import EditProduct from "./pages/Product/EditProduct";
import PendingOrder from "./pages/Order/PendingOrder";
import DeliveriedOrder from "./pages/Order/DeliveriedOrder";
import OrderDetail from "./pages/Order/OrderDetail";
import InputCategory from "./pages/Category/InputCategory";
import EditCategory from "./pages/Category/EditCategory";
import InputUser from "./pages/User/InputUser";
import Dashboard from "./pages/Home/Home";

import InputPromotion from "./pages/Promotion/InputPromotion";
import EditPromotion from "./pages/Promotion/EditPromotion";

import InputWarehouse from "./pages/Warehouse/InputWarehouse";
import EditWarehouse from "./pages/Warehouse/EditWarehouse";

import InputSupplier from "./pages/Supplier/InputSupplier";
import EditSupplier from "./pages/Supplier/EditSupplier";

const HomeAdmin = () => {
  const mode = useSelector((state) => state.globalSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/*" element={<Navigate to="/admin/products" />} />
          <Route path="/admin/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="users/add" element={<InputUser />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
            <Route path="category/add" element={<InputCategory />} />
            <Route
              path="category/edit/:idCategory"
              element={<EditCategory />}
            />

            <Route path="promotions" element={<Promotion />} />
            <Route path="promotion/add" element={<InputPromotion />} />
            <Route
              path="promotion/edit/:idPromotion"
              element={<EditPromotion />}
            />

            <Route path="suppliers" element={<Supplier />} />
            <Route path="supplier/add" element={<InputSupplier />} />
            <Route
              path="supplier/edit/:idSupplier"
              element={<EditSupplier />}
            />

            <Route path="warehouses" element={<Warehouse />} />
            <Route path="warehouse/add" element={<InputWarehouse />} />
            <Route
              path="warehouse/edit/:idWarehouse"
              element={<EditWarehouse />}
            />

            <Route path="product/add" element={<InputProduct />} />
            <Route path="product/edit/:idProduct" element={<EditProduct />} />
            <Route path="orders/*">
              <Route path="pending" element={<PendingOrder />} />
              <Route path="deliveried" element={<DeliveriedOrder />} />
              <Route path="detail/:idOrder" element={<OrderDetail />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
  );
};

export default HomeAdmin;