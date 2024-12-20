import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormPromotion from "./FormPromotion";
import { toast } from "react-toastify";
import { editPromotionApi } from "../../../redux/slices/promotionSlice";

export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const editProduct = async (data) => {
    const promotionData = { ...data, id: state?.id };
    console.log("Dữ liệu gửi lên để chỉnh sửa:", promotionData);
    await toast.success("Chỉnh sửa khuyến mãi thành công!");
    await dispatch(editPromotionApi(promotionData, navigate));
    console.log("Chỉnh sửa khuyến mãi thành công!");
  };

  return (
    <div className="container" style={{ padding: "30px 0px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "66px",
          fontWeight: "600",
          marginBottom: "30px",
          color: "#0072bc",
        }}
      >
        Chỉnh sửa khuyến mãi
      </h1>
      <FormPromotion initialData={state} submitForm={editProduct} />
    </div>
  );
}
