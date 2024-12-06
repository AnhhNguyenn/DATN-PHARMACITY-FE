// OrderDetail.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getDetailsOrderService } from "../../../services/orderServices";
import "../../styles/order-detail.css";
import { VND } from "../../../utils/convertVND";
import JsBarcode from 'jsbarcode';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

if (pdfFonts?.pdfMake?.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
    console.error("Không tìm thấy vfs trong pdfFonts. Kiểm tra lại cấu hình pdfmake.");
}


export const OrderDetail = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const total = searchParams.get('total');
    const urlStatus = searchParams.get('status');
    const [cartItems, setCartItems] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const currentStatus = orderInfo?.status || Number(urlStatus) || 0;
    const createAt = searchParams.get('createAt');

    useEffect(() => {
        const fetchGetDetailOrderApi = async () => {
            const response = await getDetailsOrderService(id);
            setCartItems(response.data);
            setOrderInfo({
                ...response.data[0],
                createAt: createAt || response.data[0]?.createAt
            });
        };

        fetchGetDetailOrderApi();
    }, [id, createAt]);

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

    const generatePDF = () => {
        try {
            const canvas = document.createElement("canvas");
            JsBarcode(canvas, id, {
                format: "CODE128",
                width: 2,
                height: 30,
            });
            const barcodeData = canvas.toDataURL("image/png");

            const docDefinition = {
                content: [
                    { text: "Pharmacity", style: "header", alignment: "center", fontSize: 18, bold: true },
                    { text: "Tiết kiệm hơn - Sống khỏe hơn", style: "subheader", alignment: "center", fontSize: 12, margin: [0, 0, 0, 10] },
                    { text: "Kính chào quý khách!", fontSize: 11, margin: [0, 0, 0, 10] },
                    {
                        columns: [
                            { text: `Ngày: ${new Date(orderInfo.createAt).toLocaleDateString()}`, fontSize: 11 },
                            { text: `Giờ: ${new Date(orderInfo.createAt).toLocaleTimeString()}`, fontSize: 11 },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto', 'auto'],
                            body: [
                                [
                                    { text: 'Sản phẩm', bold: true, fontSize: 11 },
                                    { text: 'Đơn giá', bold: true, fontSize: 11 },
                                    { text: 'SL', bold: true, fontSize: 11 },
                                    { text: 'Thành tiền', bold: true, fontSize: 11 }
                                ],
                                ...cartItems.map((item) => [
                                    { text: item.name, fontSize: 10 },
                                    { text: VND.format(item.price), fontSize: 10 },
                                    { text: item.quantity.toString(), fontSize: 10 },
                                    { text: VND.format(item.price * item.quantity), fontSize: 10 }
                                ]),
                            ],
                        },
                        margin: [0, 0, 0, 10],
                    },
                    {
                        stack: [
                            {
                                columns: [
                                    { text: 'Tổng tiền hàng:', alignment: 'left', fontSize: 11 },
                                    { text: VND.format(calculateTotal()), alignment: 'right', fontSize: 11 }
                                ],
                                margin: [0, 5, 0, 0]
                            },
                            {
                                columns: [
                                    { text: 'Phí vận chuyển:', alignment: 'left', fontSize: 11 },
                                    { text: '0 ₫', alignment: 'right', fontSize: 11 }
                                ],
                                margin: [0, 5, 0, 0]
                            },
                            {
                                columns: [
                                    { text: 'Tổng thanh toán:', alignment: 'left', bold: true, fontSize: 11 },
                                    { text: VND.format(calculateTotal()), alignment: 'right', bold: true, fontSize: 11 }
                                ],
                                margin: [0, 5, 0, 15]
                            }
                        ]
                    },
                    { image: barcodeData, width: 200, alignment: "center" },
                    { text: id, alignment: "center", fontSize: 10, margin: [0, 5, 0, 10] },
                    { text: "Nếu có sự chênh lệch giữa giá thực tế và giá trên hóa đơn xin vui lòng liên hệ 1800 6821", fontSize: 9, alignment: "center", margin: [0, 0, 0, 5] },
                    { text: "Quý khách vui lòng không đổi trả hàng khi ra khỏi cửa hàng", fontSize: 9, alignment: "center", margin: [0, 0, 0, 5] },
                    { text: "Có giá trị xuất hóa đơn VAT trong vòng 24 tiếng", fontSize: 9, alignment: "center" },
                ],
                defaultStyle: {
                    font: 'Roboto'
                },
            };

            pdfMake.createPdf(docDefinition).download(`hoa-don-${id}.pdf`);
        } catch (error) {
            console.error("Lỗi khi tạo PDF:", error);
        }
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
                <button className="print-button" onClick={generatePDF}>
                    <i className="ri-printer-line"></i>
                    In hóa đơn
                </button>
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