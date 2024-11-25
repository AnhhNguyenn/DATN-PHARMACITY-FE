import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormSupplier from "./FromSupplier";
import { toast } from "react-toastify";
import { addSupplierApi } from "../../../redux/slices/supplierSlice";

export default function InputSupplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Cấu trúc dữ liệu ban đầu cho form
  const initialValues = {
    name: "",
    description: "",
    discountPercentage: 0,
    quantity: 0,
    startDate: "",
    endDate: "",
    isActive: true,
  };

  // Hàm xử lý khi thêm khuyến mãi
  const addSupplier = async (formData) => {
    try {
      await dispatch(addSupplierApi(formData, navigate));
      toast.success("Thêm nhà cung cấp thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
      toast.error("Thêm nhà cung cấp thất bại!");
    }
  };

  return (
    <div className="container" style={{ padding: "30px 10px" }}>
      {/* Tiêu đề căn giữa và chỉnh sửa kiểu chữ */}
      <h1
        style={{
          textAlign: "center", // Căn giữa chữ
          fontSize: "66px", // Kích thước chữ to
          fontWeight: "600", // Độ đậm của chữ
          marginBottom: "30px", // Khoảng cách phía dưới
          color: "#0072bc", // Màu xanh giống Pharmacity
        }}
      >
        Thêm nhà cung cấp
      </h1>
      <FormSupplier initialData={initialValues} submitForm={addSupplier} />
    </div>
  );
}