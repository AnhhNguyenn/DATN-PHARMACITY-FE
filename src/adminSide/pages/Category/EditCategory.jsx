import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormCategory from "./FormCategory";
import { toast } from "react-toastify";
import { editCategorytApi } from "../../../redux/slices/categorySlice";

export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const editProduct = async (data) => {
    await toast.success("Chỉnh sửa loại sản phẩm thành công!");
    await dispatch(editCategorytApi(data, navigate));
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
        Chỉnh sửa Loại sản phẩm
      </h1>
      <FormCategory initialData={state} submitForm={editProduct} />
    </div>
  );
}
