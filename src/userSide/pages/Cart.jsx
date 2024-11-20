import React, { useState } from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteCartItemApi,
    getAllCartItemApi,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { VND } from "../../utils/convertVND";
import { Button, Table } from "antd";
import {
    decreaseItemService,
    increaseItemService,
} from "../../services/cartServices";

const Cart = () => {
    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "pathImg",
            key: "pathImg",
            render: (value) => {
                return (
                    <img width={"100px"} height={"100px"} src={value} alt="1" />
                );
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (value) => {
                return <>{VND.format(value)}</>;
            },
        },
        {
            title: "Số lượng",
            key: "quantity",
            render: (render) => {
                return (
                    <div style={{ display: "flex" }}>
                        <button
                            className="btn--sub__addCart"
                            onClick={() => {
                                handleDecrease(render.id);
                            }}
                        >
                            <i className="ri-subtract-fill"></i>
                        </button>

                        <div className="btn--sub__count">
                            <p>{render.quantity}</p>
                        </div>
                        <button
                            className="btn--sub__addCart"
                            onClick={() => {
                                handleIncrease(render.id);
                            }}
                        >
                            <i className="ri-add-fill"></i>
                        </button>
                    </div>
                );
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (render) => {
                return (
                    <Button
                        ghost
                        danger
                        onClick={() => removeProductFromCart(render.id)}
                    >
                        Xóa
                    </Button>
                );
            },
        },
    ];
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined) {
        navigate("/login");
    }
    const [loadingDelete, setLoadingDelete] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const summary = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();

    const removeProductFromCart = (id) => {
        const fetchRemoveProductFromCartApi = async () => {
            setLoadingDelete(true);
            const result = await dispatch(deleteCartItemApi(id));
            if (result.status === 200) {
                toast.success("Xóa thành công!");
                setLoadingDelete(false);
                dispatch(getAllCartItemApi());
            }
        };

        fetchRemoveProductFromCartApi();
    };
    const handleIncrease = async (id) => {
        const result = await increaseItemService(id);
        if (result.status === 200) {
            dispatch(getAllCartItemApi());
        }
    };
    const handleDecrease = async (id) => {
        const result = await decreaseItemService(id);
        if (result.status === 200) {
            dispatch(getAllCartItemApi());
        }
    };

    const EmptyCart = () => {
        return (
            <div className="empty-cart text-center">
                <img
                    src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706155710-0-empty-cart.png"
                    alt="Empty Cart"
                    style={{ width: "200px", marginBottom: "20px" }}
                />
                <h3>Chưa có sản phẩm nào</h3>
                <p>Hãy khám phá để mua sắm thêm</p>
                <Link to="/" className="discover-btn">
                    Khám phá ngay
                </Link>
            </div>
        );
    };
    return (
        <Helmet title="Cart">
            {loadingDelete ? (
                <Progress animated value="100" className="progress"></Progress>
            ) : (
                ""
            )}
            <section>
                <Container>
                    <Row>
                        {cartItems.length === 0 ? (
                            <Col lg="12">
                                <EmptyCart />
                            </Col>
                        ) : (
                            <>
                                <Col lg="9">
                                    <Table
                                        dataSource={cartItems}
                                        columns={columns}
                                    />
                                </Col>
                                <Col lg="3">
                                    <div style={{ display: "flex" }}>
                                        <h4>Tổng cộng: &nbsp;</h4>
                                        <h6 className="d-flex align-items-center justify-content-between">
                                            <span className="fs-4 fw-bold">
                                                {VND.format(summary)}
                                            </span>
                                        </h6>
                                    </div>
                                    <p className="fs-6 mt-2">
                                        <i>
                                            *Thuế và phí vận chuyển sẽ được tính khi
                                            thanh toán
                                        </i>
                                    </p>
                                    <div>
                                        <button className="buy__btn w-100 ">
                                            <Link to="/checkout">Thanh toán</Link>
                                        </button>
                                        <button className="buy__btn w-100 mt-3">
                                            <Link to="/shop">Tiếp tục mua sắm</Link>
                                        </button>
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Cart;