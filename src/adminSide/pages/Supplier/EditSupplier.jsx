import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormSupplier from "./FromSupplier";
import { toast } from "react-toastify";
import { editSupplierApi } from "../../../redux/slices/supplierSlice";

export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const editProduct = async (data) => {
    await toast.success("Chỉnh sửa nhà cung cấp thành công!");
    await dispatch(editSupplierApi(data, navigate));
  };
  return (
    <div className="container" style={{ padding: "30px 0px" }}>
      <h1
        style={{
          textAlign: "center", // Căn giữa chữ
          fontSize: "66px", // Kích thước chữ to
          fontWeight: "600", // Độ đậm của chữ
          marginBottom: "30px", // Khoảng cách phía dưới
          color: "#0072bc", // Màu xanh giống Pharmacity
        }}
      >
        Chỉnh sửa nhà cung cấp
      </h1>
      <FormSupplier initialData={state} submitForm={editProduct} />
    </div>
  );
}
