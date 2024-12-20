import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormWarehouseReceipt from "./FormWarehouseReceipt";
import { addReceiptApi } from "../../../redux/slices/receiptexportSlice";
import { toast } from "react-toastify";

export default function InputWarehouseReceipt() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = {
        warehouseId: "",
        supplierId: "",
        receiptDate: "",
        note: "",
        receiptDetails: []
    };

    const handleSubmit = (formData) => {
        const formattedData = {
            IdWarehouse: formData.warehouseId,
            IdSupplier: formData.supplierId,
            ReceiptDate: formData.receiptDate,
            Note: formData.note,
            ReceiptDetails: formData.receiptDetails.map(detail => ({
                idProduct: detail.productId,
                quantity: detail.quantity,
                expirationDate: detail.expirationDate || null,
            })),
        };
        console.log("formattedData before dispatch:", formattedData);

        if (!formattedData.IdWarehouse || !formattedData.IdSupplier || !formattedData.ReceiptDate) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        if (!formattedData.ReceiptDetails || formattedData.ReceiptDetails.length === 0) {
            toast.error("Vui lòng thêm ít nhất một sản phẩm");
            return;
        }

        // Chỉ navigate sau khi addReceiptApi thành công
        dispatch(addReceiptApi(formattedData)).then((res) => { // Chú ý đổi (res)
            console.log("Response from addReceiptApi:", res);
            navigate("/admin/exports/warehouse-receipt");
        });
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
                Tạo phiếu nhập kho
            </h1>
            <FormWarehouseReceipt
                initialData={initialData}
                submitForm={handleSubmit}
            />
        </div>
    );
}