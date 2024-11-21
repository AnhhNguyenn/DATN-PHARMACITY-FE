import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormPromotion from "./FormPromotion";
import { toast } from "react-toastify";
import { addPromotionApi } from "../../../redux/slices/promotionSlice";

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
  const addPromotion = async (formData) => {
    try {
      await dispatch(addPromotionApi(formData, navigate));
      toast.success("Thêm khuyến mãi thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm khuyến mãi:", error);
      toast.error("Thêm khuyến mãi thất bại!");
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
        Thêm khuyến mãi
      </h1>
      <FormPromotion initialData={initialValues} submitForm={addPromotion} />
    </div>
  );
}
