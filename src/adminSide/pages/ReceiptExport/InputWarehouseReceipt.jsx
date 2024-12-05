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
        // Format lại data trước khi gửi đi
        const formattedData = {
            warehouseId: formData.warehouseId,
            supplierId: formData.supplierId,
            receiptDate: formData.receiptDate,
            note: formData.note,
            receiptDetails: formData.receiptDetails.map(detail => ({
                productId: detail.productId,
                quantity: detail.quantity,
                product: {
                    id: detail.productId,
                    name: detail.productName
                }

            })),
            // Thêm các trường required theo schema
            warehouse: {
                id: formData.warehouseId
            },
            supplier: {
                id: formData.supplierId
            }
        };

        // Validate dữ liệu trước khi gửi
        if (!formattedData.warehouseId || !formattedData.supplierId || !formattedData.receiptDate) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        if (!formattedData.receiptDetails || formattedData.receiptDetails.length === 0) {
            toast.error("Vui lòng thêm ít nhất một sản phẩm");
            return;
        }

        // Gọi action để thêm phiếu nhập
        dispatch(addReceiptApi(formattedData, navigate));
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