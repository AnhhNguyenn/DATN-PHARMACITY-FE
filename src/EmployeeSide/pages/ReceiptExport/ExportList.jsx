import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllExportApi } from "../../../redux/slices/receiptexportSlice";

export default function ExportList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exports, setExports] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách phiếu xuất kho
    dispatch(getAllExportApi())
      .unwrap()
      .then((data) => {
        setExports(data || []);
      })
      .catch((error) => {
        console.error("Error fetching exports:", error);
      });
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
      title: "Ngày xuất",
      key: "exportDate",
      dataIndex: "exportDate",
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
        <Table columns={columns} dataSource={exports} />
      </div>
    </>
  );
}
