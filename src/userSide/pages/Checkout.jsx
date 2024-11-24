import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row, Table } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VND } from "../../utils/convertVND";
import "../styles/checkout.css";
import Payment from "./Payment";
import { FormLabel } from "@themesberg/react-bootstrap";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.total);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const onSetOpen = () => {
        setOpen(!open);
    };

    const formik = useFormik({
        initialValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phone: currentUser?.phone || '',
            address: currentUser?.address || '',
        },
        validationSchema: Yup.object({
            phone: Yup.string().required("Số điện thoại là bắt buộc"),
            address: Yup.string().required("Địa chỉ là bắt buộc"),
        }),
    });

    const handleSubmit = () => {
        if (formik.isValid) {
            onSetOpen();
        }
    };

    return (
        <Helmet title="Checkout">
            <section>
                <Container>
                    <Row>
                        <Col lg="8">
                            <div className="cart-preview mb-4">
                                <h2 className="mb-4 fw-bold checkout_h2">
                                    Thông tin đơn hàng
                                </h2>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Ảnh</th>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th>Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <img
                                                        src={item.pathImg}
                                                        alt={item.name}
                                                        className="cart-item-img"
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{VND.format(item.price)}</td>
                                                <td>{VND.format(item.price * item.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>

                            <div className="user-info-container">
                                <div className="header-container">
                                    <h2 className="mb-0 fw-bold checkout_h2">
                                        Thông tin cá nhân
                                    </h2>
                                    <button
                                        className="btn btn-sm btn-primary edit-button"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                                    </button>
                                </div>
                                <Form className="billing__form">
                                    <FormGroup>
                                        <FormLabel>Họ và tên</FormLabel>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            readOnly
                                            value={formik.values.name}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Email</FormLabel>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            readOnly
                                            value={formik.values.email}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            readOnly={!isEditing}
                                        />
                                        {formik.errors.phone && formik.touched.phone && (
                                            <div className="text-danger">{formik.errors.phone}</div>
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Địa chỉ</FormLabel>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            readOnly={!isEditing}
                                        />
                                        {formik.errors.address && formik.touched.address && (
                                            <div className="text-danger">{formik.errors.address}</div>
                                        )}
                                    </FormGroup>
                                </Form>
                            </div>
                        </Col>
                        <Col lg="4">
                            <div className="checkout__cart">
                                <h4>Tổng cộng: <span>{VND.format(totalAmount)}</span></h4>
                                <button
                                    className="buy__btn auth__btn w-100"
                                    onClick={handleSubmit}
                                    disabled={!formik.isValid}
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {open && <Payment open={open} onSetOpen={onSetOpen} />}
        </Helmet>
    );
};

export default Checkout;