import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme/theme";

import PendingOrder from "./pages/Order/PendingOrder";
import DeliveriedOrder from "./pages/Order/DeliveriedOrder";
import OrderDetail from "./pages/Order/OrderDetail";
import Dashboard from "./pages/Home/Home";

import WarehouseReceipt from "./pages/ReceiptExport/WarehouseReceipt";
import InputWarehouseReceipt from "./pages/ReceiptExport/InputWarehouseReceipt";

import ExportList from "./pages/ReceiptExport/ExportList";
import FormExport from "./pages/ReceiptExport/FormExport";

const HomeEmployee = () => {
  const mode = useSelector((state) => state.globalSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/admin/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders/*">
            <Route path="pending" element={<PendingOrder />} />
            <Route path="deliveried" element={<DeliveriedOrder />} />
            <Route path="detail/:idOrder" element={<OrderDetail />} />
          </Route>

          <Route
            path="exports/warehouse-receipt"
            element={<WarehouseReceipt />}
          />
          <Route
            path="exports/warehouse-receipt/add"
            element={<InputWarehouseReceipt />}
          />

          <Route path="exports/warehouse-export" element={<ExportList />} />
          <Route path="exports/warehouse-export/add" element={<FormExport />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default HomeEmployee;
