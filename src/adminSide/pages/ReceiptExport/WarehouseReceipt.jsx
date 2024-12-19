import React, { useEffect } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllReceiptApi } from "../../../redux/slices/receiptexportSlice";

export default function WarehouseReceipt() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy dữ liệu và trạng thái từ Redux store
    const receiptExport = useSelector((state) => state.receiptExport);
    const receipts = receiptExport?.receipts || []; // Cung cấp giá trị mặc định là mảng rỗng
    const isLoading = receiptExport?.isLoading || false;
    const error = receiptExport?.error;

    useEffect(() => {
        dispatch(getAllReceiptApi()); // Gọi API khi component mount
    }, [dispatch]);

    const columns = [
        {
            title: "Mã phiếu",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Kho",
            dataIndex: "warehouseName",
            key: "warehouseName",
        },
        {
            title: "Nhà cung cấp",
            dataIndex: "supplierName",
            key: "supplierName",
        },
        {
            title: "Ngày nhập",
            key: "receiptDate",
            dataIndex: "receiptDate",
            render: (value) => {
                var date = new Date(value);
                return <>{date.toLocaleDateString()}</>;
            },
        },
        {
            title: "Ngày hết hạn",
            key: "receiptDate",
            dataIndex: "receiptDate",
            render: (value) => {
                var date = new Date(value);
                return <>{date.toLocaleDateString()}</>;
            },
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
    ];

    if (error) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu phiếu nhập kho!");
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "50px",
                }}
            >
                <h1 className="admin-h1">Danh sách phiếu nhập kho</h1>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/exports/warehouse-receipt/add");
                    }}
                >
                    Tạo phiếu nhập
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                {/* Kiểm tra trạng thái loading và lỗi */}
                {isLoading ? (
                    <div>Loading...</div> // Hiển thị loading nếu đang tải
                ) : receipts.length === 0 ? (
                    <div>Không có phiếu nhập kho nào</div> // Hiển thị nếu không có dữ liệu
                ) : (
                    <Table columns={columns} dataSource={receipts} rowKey="id" />
                )}
            </div>
        </>
    );
}
