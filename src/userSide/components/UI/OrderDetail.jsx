// OrderDetail.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getDetailsOrderService } from "../../../services/orderServices";
import "../../styles/order-detail.css";
import { VND } from "../../../utils/convertVND";

export const OrderDetail = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const total = searchParams.get('total');
    const urlStatus = searchParams.get('status');
    const [cartItems, setCartItems] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const currentStatus = orderInfo?.status || Number(urlStatus) || 0;

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
            case 2: return "Chờ phê duyệt";
            case 3: return "Đang giao hàng";
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
                    <div className="info-card">
                        <div className="info-card__item">
                            <i className="ri-file-list-3-line"></i>
                            <div>
                                <label>Mã đơn hàng</label>
                                <strong>{id}</strong>
                            </div>
                        </div>
                        <div className="info-card__item">
                            <i className="ri-calendar-2-line"></i>
                            <div>
                                <label>Ngày đặt hàng</label>
                                <strong>{new Date(orderInfo.createAt).toLocaleString()}</strong>
                            </div>
                        </div>
                        <div className="info-card__item">
                            <i className="ri-flag-line"></i>
                            <div>
                                <label>Trạng thái</label>
                                <strong className={`status status--${getStatusColor(currentStatus)}`}>
                                    {getStatusText(currentStatus)}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-detail__content">
                <div className="order-items">
                    <div className="table-responsive">
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
                        </table>
                    </div>
                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Tổng tiền hàng:</span>
                            <strong>{VND.format(total || calculateTotal())}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển:</span>
                            <strong>0 ₫</strong>
                        </div>
                        <div className="summary-row total">
                            <span>Tổng thanh toán:</span>
                            <strong>{VND.format(total || calculateTotal())}</strong>
                        </div>
                    </div>
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