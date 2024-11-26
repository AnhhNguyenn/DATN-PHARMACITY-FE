import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormCategory from "./FormCategory";
import { toast } from "react-toastify";
import { editCategorytApi } from "../../../redux/slices/categorySlice";

export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // Log dữ liệu từ `state`
  console.log("Dữ liệu truyền vào từ state:", state);

  const editProduct = async (data) => {
    console.log("Dữ liệu nhận từ form:", data);

    await toast.success("Chỉnh sửa loại sản phẩm thành công!");
    navigate(-1); // Quay về trang trước
    await dispatch(editCategorytApi(data, navigate));
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
        Chỉnh sửa Loại sản phẩm
      </h1>
      {/* Log initialData truyền vào FormCategory */}
      {console.log("Dữ liệu initialData truyền vào FormCategory:", state)}

      <FormCategory initialData={state} submitForm={editProduct} />
    </div>
  );
}
