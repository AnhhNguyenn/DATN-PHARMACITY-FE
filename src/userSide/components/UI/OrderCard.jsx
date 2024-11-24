import React from "react";
import {
    Card,
    CardBody,
    Badge
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/order-card.css";
import { VND } from "../../../utils/convertVND";

const OrderCard = (props) => {
    const { item } = props;
    const user = JSON.parse(localStorage.getItem("user"));
    const date = new Date(item.createAt);
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case "Đang chờ phê duyệt": return "info";
            case "Chờ thanh toán": return "warning";
            case "Đã thanh toán": return "success";
            case "Đã giao hàng": return "success";
            default: return "secondary";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1: return "Chưa thanh toán";
            case 2: return "Đang chờ phê duyệt";
            case 3: return "Đã phê duyệt - Chưa thanh toán";
            case 4: return "Đã thanh toán";
            case 5: return "Đã giao hàng";
            default: return "Khởi tạo";
        }
    };

    return (
        <Card className="order-card">
            <div className="order-card__header">
                <div className="order-card__date">
                    <div className="order-card__label">Đơn hàng được tạo lúc:</div>
                    <div className="order-card__value">{date.toLocaleString()}</div>
                </div>
                <Badge
                    color={getStatusColor(item.status)}
                    className="order-card__status"
                >
                    {getStatusText(item.status)}
                </Badge>
            </div>
            <CardBody className="order-card__body">
                <div className="order-card__info">
                    <div className="order-card__info-item">
                        <div className="order-card__label">Khách hàng:</div>
                        <div className="order-card__value">{user?.name}</div>
                    </div>
                    <div className="order-card__info-item">
                        <div className="order-card__label">Số điện thoại:</div>
                        <div className="order-card__value">{user?.phone}</div>
                    </div>
                    <div className="order-card__info-item">
                        <div className="order-card__label">Địa chỉ:</div>
                        <div className="order-card__value">{user?.address}</div>
                    </div>
                    <div className="order-card__total">
                        <div className="order-card__label">Tổng tiền:</div>
                        <div className="order-card__price">{VND.format(item.total)}</div>
                    </div>
                </div>
                <button
                    className="order-card__button"
                    onClick={() => navigate(`/order/${item.id}`)}
                >
                    Chi tiết
                    <i className="fas fa-arrow-right"></i>
                </button>
            </CardBody>
        </Card>
    );
};

export default OrderCard;