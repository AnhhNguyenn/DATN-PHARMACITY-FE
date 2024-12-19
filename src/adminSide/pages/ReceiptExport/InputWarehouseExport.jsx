import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormWarehouseExport from "./FormWarehouseExport";
import { addExportApi } from "../../../redux/slices/receiptexportSlice";
import { toast } from "react-toastify";

export default function InputWarehouseExport() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = {
        warehouseId: "",
        exportDetails: []
    };

    const handleSubmit = (formData) => {
        const formattedData = {
            IdWarehouse: formData.warehouseId,
            ExportDetails: formData.exportDetails.map(detail => ({
                IdProduct: detail.productId,
                Quantity: detail.quantity,
            })),
        };

        if (!formattedData.IdWarehouse) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        if (!formattedData.ExportDetails || formattedData.ExportDetails.length === 0) {
            toast.error("Vui lòng thêm ít nhất một sản phẩm");
            return;
        }

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
            <FormWarehouseExport
                initialData={initialData}
                submitForm={handleSubmit}
            />
        </div>
    );
}