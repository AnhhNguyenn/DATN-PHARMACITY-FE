import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllReceiptApi } from "../../../redux/slices/receiptexportSlice";

export default function WarehouseReceipt() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        dispatch(getAllReceiptApi());
    }, []);

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
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        }
    ];

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "50px",
            }}>
                <h1 className="admin-h1">Danh sách phiếu nhập kho</h1>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/warehouse/receipt/add");
                    }}
                >
                    Tạo phiếu nhập
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                <Table columns={columns} dataSource={receipts} />
            </div>
        </>
    );
}