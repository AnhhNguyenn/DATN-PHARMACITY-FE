import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import { toast } from "react-toastify";
import {
  editProductApi,
  getAllProductsApi,
} from "../../../redux/slices/productSlice";

export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const editProduct = async (data) => {
    const result = await editProductApi(data);
    if (result.status === 200) {
      toast.success("Chỉnh sửa sản phẩm thành công!");
      dispatch(getAllProductsApi());
      navigate("/admin/products");
    } else {
      toast.success("Chỉnh sửa sản phẩm thất bại!");
    }
  };
  return (
    <div
      className="container"
      style={{
        padding: "20px 60px",
        maxWidth: "1500px", // Giới hạn chiều rộng để căn giữa
        margin: "50px auto", // Căn giữa theo chiều ngang và dọc
        backgroundColor: "#f9f9f9", // Màu nền nhẹ
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Tạo hiệu ứng đổ bóng
        borderRadius: "10px", // Bo góc
      }}
    >
      <h2
        style={{
          textAlign: "center", // Căn giữa tiêu đề
          fontSize: "40px", // Kích thước font chữ
          fontWeight: "bold",
          color: "#333", // Màu chữ
          marginBottom: "20px", // Tạo khoảng cách dưới
        }}
      >
        Chỉnh sửa sản phẩm
      </h2>
      <FormProduct initialData={state} submitForm={editProduct} />
    </div>
  );
}