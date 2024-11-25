import { Modal, Card, Radio, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import { createOrderService } from "../../services/orderServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import { getAllOrderApi } from "../../redux/slices/orderSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getOrderNotPayment } from "../../services/cartServices";
import './../styles/payment.css';

const Payment = ({ open, onSetOpen }) => {
    const [isTransport, setIsTransport] = useState(true);
    const [isPayment, setIsPayment] = useState("bank");
    const [price, setPrice] = useState();
    const [vietQRUrl, setVietQRUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const generateVietQRUrl = (amount) => {
        const bankId = "970418";
        const accountNo = "3680368531";
        const template = "compact2";
        const accountName = "LE VAN TU";
        const description = "Hóa đơn mua hàng";

        return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;
    };

    const onSuccess = async (type) => {
        const result = await createOrderService(
            type === 0 ? 1 : 2,
            isTransport ? 1 : 0
        );
        if (result.status === 200) {
            toast.success("Đặt hàng thành công!");
            dispatch(getAllCartItemApi());
            dispatch(getAllOrderApi());
            navigate("/order");
        } else {
            toast.error("Đặt hàng thất bại!");
        }
    };

    const onChange = (e) => {
        setIsTransport(e.target.value);
    };

    const onChangePayment = (e) => {
        setIsPayment(e.target.value);
    };

    const handleGetData = async () => {
        const result = await getOrderNotPayment();
        if (result.status === 200) {
            const shippingFee = isTransport ? 30000 : 0;
            const totalWithShipping = result.total + shippingFee;
            setPrice((totalWithShipping / 23507).toFixed());
            setVietQRUrl(generateVietQRUrl(totalWithShipping));
        }
    };

    useEffect(() => {
        handleGetData();
    }, [isTransport]);

    return (
        <Modal
            title="THANH TOÁN HOÁ ĐƠN"
            open={open}
            onCancel={onSetOpen}
            footer={null}
            className="payment-modal"
        >
            <Card title="HÌNH THỨC VẬN CHUYỂN" className="payment-card">
                <Radio.Group onChange={onChange} value={isTransport}>
                    <div className="radio-option">
                        <Radio value={true}>Chuyển phát nhanh +30.000đ</Radio>
                        <p className="description-text">
                            Chúng tôi sẽ liên hệ bạn sớm nhất trong thời gian có
                            thể. Đơn hàng của bạn sẽ được vận chuyển trong thời
                            gian 1h làm việc.
                        </p>
                    </div>
                    <Radio value={false}>Giao hàng miễn phí</Radio>
                </Radio.Group>
            </Card>

            <Card title="HÌNH THỨC THANH TOÁN" className="payment-card">
                <Radio.Group onChange={onChangePayment} value={isPayment}>
                    <div className="radio-option">
                        <Radio value="bank">Thanh toán bằng thẻ ngân hàng</Radio>
                    </div>
                    <div className="radio-option">
                        <Radio value="vietqr">Thanh toán qua VietQR</Radio>
                    </div>
                    <div className="radio-option">
                        <Radio value="cod">Sau khi nhận được hàng</Radio>
                        <p className="description-text">
                            Nhân viên sẽ liên lạc với bạn và giao hàng. Bạn sẽ
                            trực tiếp thanh toán với nhân viên giao hàng.
                        </p>
                    </div>
                </Radio.Group>
            </Card>

            <Row className="payment-actions">
                <Col span={24}>
                    {isPayment === "bank" ? (
                        <PayPalScriptProvider options={{ clientId: "test" }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: price,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        if (details.status === "COMPLETED") {
                                            onSuccess(1);
                                        }
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                    ) : isPayment === "vietqr" ? (
                        <div className="vietqr-container">
                            <img src={vietQRUrl} alt="VietQR Payment" className="vietqr-image" />
                            <p className="vietqr-note">Quét mã QR để thanh toán</p>
                            <Button
                                block
                                type="primary"
                                onClick={() => onSuccess(1)}
                                className="payment-button"
                            >
                                XÁC NHẬN ĐÃ THANH TOÁN
                            </Button>
                        </div>
                    ) : (
                        <Button
                            block
                            type="primary"
                            onClick={() => onSuccess(0)}
                            className="payment-button"
                        >
                            THANH TOÁN
                        </Button>
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

export default Payment;