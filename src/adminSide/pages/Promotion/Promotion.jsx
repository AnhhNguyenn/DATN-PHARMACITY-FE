import React from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllPromotionApi } from "../../../redux/slices/promotionSlice";
export default function Promotion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.promotion.promotions);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khuyến mãi",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Hastag",
      dataIndex: "slug",
      key: "slug",
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
              navigate(`/admin/Promotion/edit/${record.id}`, {
                state: record,
              });
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginLeft: "4px" }}
            onClick={() => onDelete(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];
  const rows = listProduct.length > 0 ? listProduct : [];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "50px",
        }}
      >
        <h1 className="admin-h1">Danh sách loại sản phẩm</h1>
        <Button
          style={{
            marginRight: "100px",
            padding: "10px",
          }}
          color="success"
          variant="contained"
          onClick={() => {
            navigate("/admin/Promotion/add");
          }}
        >
          Thêm khuyến mãi
        </Button>
      </div>
      <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
        <Table columns={columns} dataSource={rows} />
      </div>
    </>
  );
}
