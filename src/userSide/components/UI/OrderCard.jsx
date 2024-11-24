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
        <>
            <Container>
                <Card className="card__container">
                    <CardTitle className="card__title">
                        Đơn hàng được tạo lúc:{" "}
                        <span>{date.toLocaleString()}</span>
                    </CardTitle>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <CardText>
                                    Số điện thoại: <span>{user?.phone}</span>
                                </CardText>
                                <CardText>
                                    Địa chỉ: <span>{user?.address}</span>
                                </CardText>
                            </Col>
                            <Col>
                                <div>
                                    Trạng thái:
                                    {item.status === 1
                                        ? " Chưa thanh toán"
                                        : item.status === 2
                                        ? " Đang chờ phê duyệt"
                                        : item.status === 3
                                        ? " Đã phê duyệt và chưa thanh toán"
                                        : item.status === 4
                                        ? " Đã phê duyệt và đã thanh toán"
                                        : item.status === 5
                                        ? " Đã giao"
                                        : " Khởi tạo"}
                                </div>
                            </Col>
                            <Col md={3} className="drop__detail">
                                <CardText>
                                    Tổng tiền:{" "}
                                    <span>{VND.format(item?.total)}</span>
                                </CardText>
                                <button
                                    className="buy__btn detail__btn"
                                    onClick={handleClick}
                                >
                                    Chi tiết
                                </button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default OrderCard;