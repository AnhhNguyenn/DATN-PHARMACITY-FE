import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormPromotion from "./FormPromotion";
import { toast } from "react-toastify";
import { editPromotionApi } from "../../../redux/slices/promotionSlice";

export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const editProduct = async (data) => {
    await toast.success("Chỉnh sửa khuyến mãi thành công!");
    navigate(-1); // Quay về trang trước
    await dispatch(editPromotionApi(data, navigate));
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
        Chỉnh sửa khuyến mãi
      </h1>
      <FormPromotion initialData={state} submitForm={editProduct} />
    </div>
  );
}
