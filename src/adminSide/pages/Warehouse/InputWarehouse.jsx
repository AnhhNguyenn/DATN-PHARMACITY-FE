import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormWarehouse from "./FormWarehouse";
import { toast } from "react-toastify";
import { addWarehouseApi } from "../../../redux/slices/warehouseSlice";

export default function InputPromotion() {
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
  const addWarehouse = async (formData) => {
    try {
      await dispatch(addWarehouseApi(formData)); // Gọi API thêm kho
      toast.success("Thêm kho thành công!");
      navigate(-1); // Quay về trang trước
    } catch (error) {
      console.error("Lỗi khi thêm kho:", error);
      toast.error("Thêm kho thất bại!");
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
        Thêm Kho
      </h1>
      <FormWarehouse initialData={initialValues} submitForm={addWarehouse} />
    </div>
  );
}
