// OrderDetail.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getDetailsOrderService } from "../../../services/orderServices";
import "../../styles/order-detail.css";
import { VND } from "../../../utils/convertVND";

export const OrderDetail = () => {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        const fetchGetDetailOrderApi = async () => {
            const response = await getDetailsOrderService(id);
            setCartItems(response.data);
            setOrderInfo(response.data[0]); // Giả sử thông tin đơn hàng nằm trong item đầu tiên
        };

        fetchGetDetailOrderApi();
    }, [id]);

    const getStatusColor = (status) => {
        switch (status) {
            case 1: return "warning";
            case 2: return "info";
            case 3: return "info";
            case 4: return "success";
            case 5: return "success";
            default: return "secondary";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1: return "Chờ thanh toán";
            case 2: return "Đang chờ phê duyệt";
            case 3: return "Đã phê duyệt - Chưa thanh toán";
            case 4: return "Đã thanh toán";
            case 5: return "Đã giao hàng";
            default: return "Khởi tạo";
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (!orderInfo) return null;

    return (
        <>
            <Container className="table__order">
                <h3 className="title__order--item"> Chi tiết đơn hàng</h3>
                <Row>
                    <Col lg="12">
                        <table className="table bordered">
                            <thead>
                                <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => {
                                    return <Tr item={item} key={index} />;
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const Tr = ({ item }) => {
    return (
        <tr>
            <td>
                <div className="product-info">
                    <img src={item.pathImg} alt={item.name} />
                    <div className="product-details">
                        <div className="product-name">{item.name}</div>
                        <div className="product-code">Mã SP: {item.id}</div>
                    </div>
                </div>
            </td>
            <td>{VND.format(item.price)}</td>
            <td>{item.quantity}</td>
            <td>{VND.format(item.price * item.quantity)}</td>
        </tr>
    );
};