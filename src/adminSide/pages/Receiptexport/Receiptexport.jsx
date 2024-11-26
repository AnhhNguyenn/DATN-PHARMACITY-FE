import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button as AntButton } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllReceiptApi,
  getAllExportApi,
} from "../../../redux/slices/receiptexportSlice";
import "./Receiptexport.css";

export default function ReceiptExport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dữ liệu nhận từ Redux store
  const { receipts, exports } = useSelector((state) => ({
    receipts: state.receiptexport.receipts,
    exports: state.receiptexport.exports,
  }));

  useEffect(() => {
    dispatch(getAllReceiptApi());
    dispatch(getAllExportApi());
  }, [dispatch]);

  const onDelete = async (id, type) => {
    // Gọi hàm xóa (cần tích hợp thêm service xóa nếu có)
    const result = await deleteServiceByType(type, id); // replace with actual service
    if (result.status === 200) {
      toast.success("Xóa thành công!");
      if (type === "receipt") {
        await dispatch(getAllReceiptApi());
      } else {
        await dispatch(getAllExportApi());
      }
    } else {
      toast.error("Xóa thất bại!");
    }
  };

  const columns = (type) => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <AntButton
            type="primary"
            style={{ marginRight: "8px" }}
            onClick={() =>
              navigate(`/admin/${type}/edit/${record.id}`, { state: record })
            }
          >
            Chỉnh sửa
          </AntButton>
          <AntButton type="danger" onClick={() => onDelete(record.id, type)}>
            Xóa
          </AntButton>
        </>
      ),
    },
  ];

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
        Quản lý phiếu nhập và xuất kho
      </h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Phiếu nhập kho */}
        <div style={{ width: "48%" }}>
          <h2>Danh sách Phiếu Nhập Kho</h2>
          <Table
            columns={columns("receipt")}
            dataSource={receipts}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>

        {/* Phiếu xuất kho */}
        <div style={{ width: "48%" }}>
          <h2>Danh sách Phiếu Xuất Kho</h2>
          <Table
            columns={columns("export")}
            dataSource={exports}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
}

async function deleteServiceByType(type, id) {
  // Giả lập hàm xóa, cần thay bằng logic thật
  return Promise.resolve({ status: 200 });
}
