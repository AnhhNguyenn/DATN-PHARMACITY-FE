import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategoryApi } from "../../../redux/slices/categorySlice";
import FormCategory from "./FormCategory";
import { toast } from "react-toastify";

export default function InputCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    slug: "",
  };

  const addCategory = async (formData) => {
    await toast.success("Thêm loại sản phẩm thành công!");
    await dispatch(addCategoryApi(formData, navigate));
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
        Thêm loại sản phẩm
      </h1>
      <FormCategory initialData={initialValues} submitForm={addCategory} />
    </div>
  );
}
