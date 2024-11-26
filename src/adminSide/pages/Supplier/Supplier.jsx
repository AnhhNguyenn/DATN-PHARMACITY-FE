import React, { useEffect } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllSupplierApi } from "../../../redux/slices/supplierSlice";
import { deleteSupplierServices } from "../../../services/supplierService";

export default function Supplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const suppliers = useSelector((state) => state.supplier.suppliers);

  const onDelete = async (id) => {
    const result = await deleteSupplierServices(id);
    if (result.status === 200) {
      toast.success("Xóa thành công!");
      await dispatch(getAllSupplierApi());
      navigate("/admin/suppliers");
    } else {
      toast.error("Xóa thất bại!");
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    dispatch(getAllSupplierApi());
  }, [dispatch]);

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
              navigate(`/admin/Supplier/edit/${record.id}`, {
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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "50px",
        }}
      >
        <h1 className="admin-h1">Danh sách nhà cung cấp</h1>
        <Button
          style={{
            marginRight: "100px",
            padding: "10px",
          }}
          color="success"
          variant="contained"
          onClick={() => {
            navigate("/admin/Supplier/add");
          }}
        >
          Thêm Nhà cung cấp
        </Button>
      </div>
      <div style={{ height: "auto", width: "100%", padding: "20px" }}>
        <Table
          columns={columns}
          dataSource={suppliers.map((item) => ({ ...item, key: item.id }))}
          loading={!suppliers.length}
        />
      </div>
    </>
  );
}
