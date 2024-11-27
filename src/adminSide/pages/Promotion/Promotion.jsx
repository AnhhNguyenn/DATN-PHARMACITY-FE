import React, { useEffect } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllPromotionApi } from "../../../redux/slices/promotionSlice";
import { deletePromotionServices } from "../../../services/promotionServices";

export default function Promotion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const promotions = useSelector((state) => state.promotion.promotions);

  const onDelete = async (id) => {
    const result = await deletePromotionServices(id);
    if (result.status === 200) {
      toast.success("Xóa thành công!");
      dispatch(getAllPromotionApi());
      navigate("/admin/promotions");
    } else {
      toast.error("Xóa thất bại!");
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    dispatch(getAllPromotionApi());
  }, [dispatch]);

  useEffect(() => {
    console.log(promotions);  // Log ra toàn bộ dữ liệu promotions
  }, [promotions]);

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => {
        console.log("Ngày bắt đầu:", text);
        return text ? new Date(text).toLocaleDateString("vi-VN") : "";
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => {
        return text ? new Date(text).toLocaleDateString("vi-VN") : "";
      },
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
              navigate(`/admin/Promotion/edit/${record.id}`, { state: record });
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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "50px",
        }}
      >
        <h1 className="admin-h1">Danh sách khuyến mãi</h1>
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
      <div style={{ height: "auto", width: "100%", padding: "20px" }}>
        <Table
          columns={columns}
          dataSource={promotions.map((item) => ({ ...item, key: item.id }))}
          loading={!promotions.length}
        />
      </div>
    </>
  );
}
