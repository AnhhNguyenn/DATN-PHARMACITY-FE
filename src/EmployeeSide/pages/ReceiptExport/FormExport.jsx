import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Select, DatePicker, Input, Form, Table } from "antd";
import { getAllWarehouseServices } from "../../../services/warehouseService";
import { getAllProductService } from "../../../services/productService";

export default function FormExport(props) {
    const { initialData, submitForm } = props;
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [exportDetails, setExportDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [warehouseRes, productRes] = await Promise.all([
                    getAllWarehouseServices(),
                    getAllProductService(),
                ]);

                setWarehouses(warehouseRes.data || []);
                setProducts(productRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            ...initialData,
        },
        validationSchema: Yup.object({
            warehouseId: Yup.string().required("Required"),
            exportDate: Yup.date().required("Required"),
            note: Yup.string(),
            exportDetails: Yup.array().of(
                Yup.object({
                    productId: Yup.string().required("Required"),
                    quantity: Yup.number().min(1, "Must be at least 1").required("Required"),
                })
            ),
        }),
        onSubmit: (values) => {
            submitForm({
                ...values,
                exportDetails: exportDetails,
            });
        },
    });

    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "productId",
            key: "productId",
            render: (text, record, index) => (
                <Select
                    style={{ width: "100%" }}
                    onChange={(value) => handleProductChange(value, index)}
                    options={products.map((product) => ({
                        value: product.id,
                        label: product.name,
                    }))}
                />
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (text, record, index) => (
                <Input
                    type="number"
                    min={1}
                    onChange={(e) => handleQuantityChange(e.target.value, index)}
                />
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record, index) => (
                <Button onClick={() => handleRemoveDetail(index)}>Xóa</Button>
            ),
        },
    ];

    const handleAddDetail = () => {
        setExportDetails([...exportDetails, { productId: "", quantity: 0 }]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = [...exportDetails];
        newDetails.splice(index, 1);
        setExportDetails(newDetails);
    };

    const handleProductChange = (value, index) => {
        const selectedProduct = products.find((product) => product.id === value);
        const newDetails = [...exportDetails];
        newDetails[index].productId = value;
        newDetails[index].productName = selectedProduct?.name || "";
        setExportDetails(newDetails);
    };

    const handleQuantityChange = (value, index) => {
        const newDetails = [...exportDetails];
        newDetails[index].quantity = parseInt(value);
        setExportDetails(newDetails);
    };

    return (
        <div className="container mt-5" style={{ padding: "0px 60px" }}>
            <Form
                onFinish={formik.handleSubmit}
                layout="vertical"
                className="container"
            >
                {/* Kho */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Kho</h5>
                    <Select
                        name="warehouseId"
                        onChange={(value) => formik.setFieldValue("warehouseId", value)}
                        options={warehouses.map((warehouse) => ({
                            value: warehouse.id,
                            label: warehouse.name,
                        }))}
                        style={{ width: "100%" }}
                    />
                    <span className="text-danger">{formik.errors.warehouseId}</span>
                </div>

                {/* Ngày xuất */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Ngày xuất</h5>
                    <DatePicker
                        className="form-control"
                        name="exportDate"
                        onChange={(date) => formik.setFieldValue("exportDate", date)}
                        style={{ width: "300px" }}
                    />
                    <span className="text-danger">{formik.errors.exportDate}</span>
                </div>

                {/* Ghi chú */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Ghi chú</h5>
                    <Input.TextArea
                        className="form-control"
                        name="note"
                        onChange={formik.handleChange}
                        style={{ width: "100%" }}
                    />
                    <span className="text-danger">{formik.errors.note}</span>
                </div>

                {/* Bảng chi tiết sản phẩm */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Chi tiết sản phẩm</h5>
                    <Button
                        onClick={handleAddDetail}
                        type="primary"
                        style={{ marginBottom: "15px" }}
                    >
                        Thêm sản phẩm
                    </Button>
                    <Table
                        columns={columns}
                        dataSource={exportDetails}
                        rowKey={(record, index) => index}
                        bordered
                        pagination={false}
                    />
                </div>

                {/* Nút submit */}
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{
                        fontSize: "16px",
                        marginTop: "20px",
                    }}
                >
                    Lưu
                </Button>
            </Form>
        </div>
    );
}