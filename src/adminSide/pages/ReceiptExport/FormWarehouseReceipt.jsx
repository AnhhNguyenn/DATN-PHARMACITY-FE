import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Select, DatePicker, Input, Form, Table } from "antd";
import { getAllWarehouseServices } from "../../../services/warehouseService";
import { getAllSupplierServices } from "../../../services/supplierService";
import { getAllProductService } from "../../../services/productService";

export default function FormWarehouseReceipt(props) {
    const { initialData, submitForm } = props;
    const [warehouses, setWarehouses] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [receiptDetails, setReceiptDetails] = useState(initialData.receiptDetails || []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [warehouseRes, supplierRes, productRes] = await Promise.all([
                    getAllWarehouseServices(),
                    getAllSupplierServices(),
                    getAllProductService()
                ]);

                setWarehouses(warehouseRes.data || []);
                setSuppliers(supplierRes.data || []);
                setProducts(productRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            warehouseId: initialData.warehouseId || "",
            supplierId: initialData.supplierId || "",
            receiptDate: initialData.receiptDate || "",
            note: initialData.note || "",
            receiptDetails: receiptDetails
        },
        validationSchema: Yup.object({
            warehouseId: Yup.string().required("Required"),
            supplierId: Yup.string().required("Required"),
            receiptDate: Yup.date().required("Required"),
            note: Yup.string(),
            receiptDetails: Yup.array().of(
                Yup.object({
                    productId: Yup.string().required("Required"),
                    quantity: Yup.number().min(1, "Must be at least 1").required("Required")
                })
            )
        }),
        onSubmit: (values) => {
            submitForm({
                ...values,
                receiptDetails: receiptDetails
            });
        }
    });

    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "productId",
            key: "productId",
            width: "65%",
            render: (text, record, index) => (
                <Select
                    style={{ width: "100%" }}
                    value={record.productId}
                    onChange={(value) => handleProductChange(value, index)}
                    options={products.map(product => ({
                        value: product.id,
                        label: product.name
                    }))}
                />
            )
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: "20%",
            render: (text, record, index) => (
                <Input
                    type="number"
                    min={1}
                    value={record.quantity}
                    onChange={(e) => handleQuantityChange(e.target.value, index)}
                />
            )
        },
        {
            title: "Hạn sử dụng",
            dataIndex: "expirationDate",
            key: "expirationDate",
            width: "25%",
            render: (text, record, index) => (
                <DatePicker
                    value={record.expirationDate}
                    onChange={(date) => handleExpirationDateChange(date, index)}
                />
            )
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record, index) => (
                <Button onClick={() => handleRemoveDetail(index)}>Xóa</Button>
            )
        },
    ];

    const handleAddDetail = () => {
        const newDetail = { productId: "", quantity: 1, expirationDate: null };
        setReceiptDetails([...receiptDetails, newDetail]);
        console.log("receiptDetails after add:", [...receiptDetails, newDetail]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = [...receiptDetails];
        newDetails.splice(index, 1);
        setReceiptDetails(newDetails);
        console.log("receiptDetails after remove at index", index, ":", newDetails);
    };

    const handleProductChange = (value, index) => {
        const newDetails = [...receiptDetails];
        newDetails[index].productId = value;
        setReceiptDetails(newDetails);
        console.log("receiptDetails after product change at index", index, ":", newDetails);
    };

    const handleQuantityChange = (value, index) => {
        const newDetails = [...receiptDetails];
        newDetails[index].quantity = parseInt(value);
        setReceiptDetails(newDetails);
        console.log("receiptDetails after quantity change at index", index, ":", newDetails);
    };

    const handleExpirationDateChange = (date, index) => {
        const newDetails = [...receiptDetails];
        newDetails[index].expirationDate = date;
        setReceiptDetails(newDetails);
        console.log("receiptDetails after expiration date change at index", index, ":", newDetails);
    };

    useEffect(() => {
        console.log("receiptDetails in useEffect:", receiptDetails);
    }, [receiptDetails]); // dependency array, will run when receiptDetails changes


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
                        value={formik.values.warehouseId}
                        onChange={(value) => formik.setFieldValue("warehouseId", value)}
                        options={warehouses.map(warehouse => ({
                            value: warehouse.id,
                            label: warehouse.name
                        }))}
                        style={{ width: "100%" }}
                    />
                    <span className="text-danger">{formik.errors.warehouseId}</span>
                </div>

                {/* Nhà cung cấp */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Nhà cung cấp</h5>
                    <Select
                        name="supplierId"
                        value={formik.values.supplierId}
                        onChange={(value) => formik.setFieldValue("supplierId", value)}
                        options={suppliers.map(supplier => ({
                            value: supplier.id,
                            label: supplier.name
                        }))}
                        style={{ width: "100%" }}
                    />
                    <span className="text-danger">{formik.errors.supplierId}</span>
                </div>

                {/* Ngày nhập */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Ngày nhập</h5>
                    <DatePicker
                        className="form-control"
                        value={formik.values.receiptDate}
                        onChange={(date) => formik.setFieldValue("receiptDate", date)}
                        style={{ width: "300px" }}
                    />
                    <span className="text-danger">{formik.errors.receiptDate}</span>
                </div>

                {/* Ghi chú */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <h5 style={{ marginBottom: "10px" }}>Ghi chú</h5>
                    <Input.TextArea
                        className="form-control"
                        name="note"
                        value={formik.values.note}
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
                        dataSource={receiptDetails}
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
                        marginTop: "20px"
                    }}
                >
                    Lưu
                </Button>
            </Form>
        </div>
    );
}
