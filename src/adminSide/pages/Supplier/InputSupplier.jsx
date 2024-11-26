import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormSupplier from "./FormSupplier";
import { toast } from "react-toastify";
import { addSupplierApi } from "../../../redux/slices/supplierSlice";

export default function InputSupplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Cấu trúc dữ liệu ban đầu cho form
  const initialValues = {
    id: "", // UUID của nhà cung cấp (sẽ được tự động tạo ở backend nếu không yêu cầu nhập)
    name: "", // Tên nhà cung cấp
    address: "", // Địa chỉ
    phone: "", // Số điện thoại
    email: "", // Email
    createAt: "", // Ngày tạo (sẽ được backend tự động thêm nếu không yêu cầu nhập)
  };

  // Hàm xử lý khi thêm nhà cung cấp
  const addSupplier = async (formData) => {
    try {
      await dispatch(addSupplierApi(formData, navigate));
      toast.success("Thêm nhà cung cấp thành công!");
      navigate(-1); // Quay về trang trước
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
      {/* Gọi form với dữ liệu ban đầu và hàm submit */}
      <FormSupplier initialData={initialValues} submitForm={addSupplier} />
    </div>
  );
}
