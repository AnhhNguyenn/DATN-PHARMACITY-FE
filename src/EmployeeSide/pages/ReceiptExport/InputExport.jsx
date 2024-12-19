import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormExport from "./FormExport";
import { addExportApi } from "../../../redux/slices/receiptexportSlice";
import { toast } from "react-toastify";

export default function InputExport() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialData = {
        warehouseId: "",
        exportDate: "",
        note: "",
        exportDetails: [],
    };

    const handleSubmit = (formData) => {
        // Format lại data trước khi gửi đi
        const formattedData = {
            warehouseId: formData.warehouseId,
            exportDate: formData.exportDate,
            note: formData.note,
            exportDetails: formData.exportDetails.map((detail) => ({
                productId: detail.productId,
                quantity: detail.quantity,
                product: {
                    id: detail.productId,
                    name: detail.productName,
                },
            })),
        };

        // Validate dữ liệu trước khi gửi
        if (!formattedData.warehouseId || !formattedData.exportDate) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        if (!formattedData.exportDetails || formattedData.exportDetails.length === 0) {
            toast.error("Vui lòng thêm ít nhất một sản phẩm");
            return;
        }

        // Gọi action để thêm phiếu xuất
        dispatch(addExportApi(formattedData, navigate));
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
                Tạo phiếu xuất kho
            </h1>
            <FormExport initialData={initialData} submitForm={handleSubmit} />
        </div>
    );
}