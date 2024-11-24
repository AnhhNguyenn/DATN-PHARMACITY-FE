import Button from "@mui/material/Button";
import { Table, Input, Row, Col, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProductsApi } from "../../../redux/slices/productSlice";
import { deleteProduct } from "../../../services/productService";
import { VND } from "../../../utils/convertVND";
import "./product.css";

const { Search } = Input;

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.product.products);
  const [data, setData] = useState(listProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 100;

  const onDelete = async (id) => {
    const result = await deleteProduct(id);
    if (result.status === 200) {
      toast.success("Xóa thành công!");
      dispatch(
        getAllProductsApi({ pageNumber: currentPage, pageSize: itemsPerPage })
      );
      navigate("/admin/products");
    } else {
      toast.error("Xóa thất bại!");
    }
  };

  useEffect(() => {
    dispatch(
      getAllProductsApi({ pageNumber: currentPage, pageSize: itemsPerPage })
    );
  }, [currentPage, dispatch]);

  useEffect(() => {
    setData(listProduct);
  }, [listProduct]);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "pathImg",
      key: "pathImg",
      render: (text) => (
        <img className="img__product--admin" src={text} alt="product" />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Giá sản phẩm",
      key: "price",
      render: (text) => <>{VND.format(text.price)}</>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (value) => <>{value ? "Còn hàng" : "Hết hàng"}</>,
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
              navigate(`/admin/product/edit/${record.id}`, { state: record });
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

  const onFilter = (value) => {
    setSearchValue(value);
    const filteredData = listProduct.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <>
      <Row gutter={24} style={{ margin: "20px" }}>
        <Col span={8}>
          <h1 className="admin-h1">Danh sách sản phẩm</h1>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Search
            placeholder="Nhập sản phẩm bạn muốn tìm..."
            value={searchValue}
            enterButton
            onChange={(e) => onFilter(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="success"
            variant="contained"
            onClick={() => navigate("/admin/product/add")}
            style={{ marginLeft: "8px" }}
          >
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={listProduct.pagination?.totalRecords || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          hideOnSinglePage={true}
          responsive={true}
        />
      </div>
    </>
  );
}
