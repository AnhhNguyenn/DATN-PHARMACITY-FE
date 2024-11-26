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
        <Container className="order-detail">
            <div className="order-detail__header">
                <h2>Chi tiết đơn hàng</h2>
                <div className="order-info">
                    <div className="order-info__item">
                        <span>Mã đơn hàng:</span>
                        <strong>{id}</strong>
                    </div>
                    <div className="order-info__item">
                        <span>Ngày đặt hàng:</span>
                        <strong>{new Date(orderInfo.createAt).toLocaleString()}</strong>
                    </div>
                    <div className="order-info__item">
                        <span>Trạng thái:</span>
                        <strong className={`status status--${getStatusColor(orderInfo.status)}`}>
                            {getStatusText(orderInfo.status)}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="order-detail__content">
                <div className="order-items">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <Tr item={item} key={index} />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">Tổng tiền:</td>
                                <td>{VND.format(calculateTotal())}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Container>
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