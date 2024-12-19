import React, { useEffect } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllExportApi } from "../../../redux/slices/receiptexportSlice";

export default function WarehouseExport() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { receiptexports, isLoading, error } = useSelector((state) => state.receiptexport);
    useEffect(() => {
        dispatch(getAllExportApi());
    }, [dispatch]);

    const columns = [
        {
            title: "Mã phiếu",
            dataIndex: "exportId",
            key: "exportId",
        },
        {
            title: "Kho",
            dataIndex: "warehouseName",
            key: "warehouseName",
        },
        {
            title: "Chi tiết sản phẩm",
            dataIndex: "exportDetails",
            key: "exportDetails",
            render: (exportDetails) => (
                <ul>
                    {exportDetails.map((detail) => (
                        <li key={detail.productId}>
                            {detail.productName} - Số lượng: {detail.quantity}
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    if (error) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu phiếu xuất kho!");
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
                <h1 className="admin-h1">Danh sách phiếu xuất kho</h1>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/exports/warehouse-export/add");
                    }}
                >
                    Tạo phiếu xuất
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : receiptexports?.length === 0 || !receiptexports ? (
                    <div>Không có phiếu xuất kho nào</div>
                ) : (
                    <Table columns={columns} dataSource={receiptexports} rowKey="exportId" />
                )}
            </div>
        </>
    );
}