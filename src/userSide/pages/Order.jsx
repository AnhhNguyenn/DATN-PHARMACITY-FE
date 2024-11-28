import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { Container } from "reactstrap";
import { Clock, Package2, Truck, CheckCircle2 } from "lucide-react";

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('chothanhtoan');
    const user = JSON.parse(localStorage.getItem("user"));

    const ORDER_STATES = [
        { id: 'chothanhtoan', label: 'Chờ thanh toán', status: 1, icon: Clock },
        { id: 'dangxuly', label: 'Đang xử lý', status: 2, icon: Package2 },
        { id: 'danggiaohang', label: 'Đang giao hàng', status: 3, icon: Truck },
        { id: 'dadonggoi', label: 'Đã đóng gói', status: 4, icon: Package2 },
        { id: 'hoanthanh', label: 'Đã giao hàng', status: 5, icon: CheckCircle2 },
    ];

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await getAllOrderAnUserService(user?.id);
        if (response.data?.status === 200) {
            setOrders(response.data.data);
        }
    };

    const getFilteredOrders = () => {
        let filtered = [...orders];

        if (activeTab !== 'all') {
            const selectedTab = ORDER_STATES.find(tab => tab.id === activeTab);
            filtered = orders.filter(order => order.status === selectedTab?.status);
        }

        return filtered;
    };

    const getProgressStatus = (order) => {
        const currentStateIndex = ORDER_STATES.findIndex(state => state.status === order.status);
        return currentStateIndex;
    };

    return (
        <div className="oh">
            <div className="oh__header">
                <h2 className="oh__title">Lịch sử đơn hàng</h2>
            </div>

            <Container>
                {getFilteredOrders().length > 0 ? (
                    <div className="oh__list">
                        {getFilteredOrders().map((item, index) => (
                            <div key={index}>
                                <div className="order-progress">
                                    {ORDER_STATES.map((state, idx) => {
                                        const currentProgress = getProgressStatus(item);
                                        const StateIcon = state.icon;
                                        return (
                                            <div
                                                key={state.id}
                                                className={`progress-step ${idx <= currentProgress ? 'active' : ''
                                                    }`}
                                            >
                                                <div className="progress-icon">
                                                    <StateIcon size={20} />
                                                </div>
                                                <span className="progress-label">{state.label}</span>
                                                {idx < ORDER_STATES.length - 1 && (
                                                    <div className={`progress-line ${idx < currentProgress ? 'active' : ''
                                                        }`} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <OrderCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="oh__empty">
                        <img
                            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706155228-0-empty-order-history.svg"
                            alt="Không có đơn hàng"
                            className="oh__empty-img"
                        />
                        <h4 className="oh__empty-title">Không có đơn hàng nào</h4>
                        <p className="oh__empty-text">
                            Hãy thêm sản phẩm vào giỏ hàng và tạo đơn hàng của bạn ngay hôm nay!
                        </p>
                        <button
                            className="oh__shop-btn"
                            onClick={() => navigate('/')}
                        >
                            Mua ngay
                        </button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Order;