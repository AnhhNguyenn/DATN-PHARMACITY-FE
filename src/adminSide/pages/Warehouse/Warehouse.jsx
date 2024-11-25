import React, { useEffect } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllWarehouseApi } from "../../../redux/slices/warehouseSlice";

export default function Warehouse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const warehouses = useSelector((state) => state.warehouse.warehouses);

  // Gọi API khi component được render
  useEffect(() => {
    dispatch(getAllWarehouseApi());
  }, [dispatch]);

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên kho",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginLeft: "4px" }}
            onClick={() => {
              navigate(`/admin/Warehouse/edit/${record.id}`, {
                state: record,
              });
            }}
          >
            Chỉnh sửa
          </Button>
        </>
      ),
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
        <h1 className="admin-h1">Danh sách Kho</h1>
        <Button
          style={{
            marginRight: "100px",
            padding: "10px",
          }}
          color="success"
          variant="contained"
          onClick={() => {
            navigate("/admin/Warehouse/add");
          }}
        >
          Thêm kho
        </Button>
      </div>
      <div style={{ height: "auto", width: "100%", padding: "20px" }}>
        <Table
          columns={columns}
          dataSource={warehouses.map((item) => ({ ...item, key: item.id }))} // Gán key từ id
          loading={!warehouses.length}
        />
      </div>
    </>
  );
}