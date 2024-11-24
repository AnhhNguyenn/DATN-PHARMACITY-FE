import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { Input, Container } from "reactstrap";
import { Search } from 'lucide-react';

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('hoanthanh');
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));

    const ORDER_TABS = [
        { id: 'hoanthanh', label: 'Hoàn thành', status: 5 },
        { id: 'dangxuly', label: 'Đang xử lý', status: 2 },
        { id: 'dadonggoi', label: 'Đã đóng gói', status: 3 },
        { id: 'danggiao', label: 'Đang giao', status: 4 },
        { id: 'dahuy', label: 'Đã hủy', status: 6 },
        { id: 'chothanhtoan', label: 'Chờ thanh toán', status: 1 },
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
            const selectedTab = ORDER_TABS.find(tab => tab.id === activeTab);
            filtered = orders.filter(order => order.status === selectedTab?.status);
        }

        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.id.toString().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    return (
        <div className="oh">
            <div className="oh__header">
                <h2 className="oh__title">Lịch sử đơn hàng</h2>
                <div className="oh__search-wrapper">
                    <Search className="oh__search-icon" size={16} strokeWidth={2} />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="oh__search"
                    />
                </div>
            </div>

            <Container>
                <div className="oh__tabs">
                    {ORDER_TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`oh__tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {getFilteredOrders().length > 0 ? (
                    <div className="oh__list">
                        {getFilteredOrders().map((item, index) => (
                            <OrderCard item={item} key={index} />
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