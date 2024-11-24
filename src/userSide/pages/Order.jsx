import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { Nav, NavItem, NavLink, Input, Container } from "reactstrap";

const Order = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [activeTab, setActiveTab] = useState('hoanthanh');
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        const fetchOrders = async () => {
            const id = user?.id;
            const data = await getAllOrderAnUserService(id);
            if (data.data?.status === 200) {
                setOrder(data.data.data);
            }
        };
        fetchOrders();
    }, []);

    const filterOrders = () => {
        let filtered = [...order];

        // Lọc theo tab
        if (activeTab !== 'all') {
            filtered = order.filter(item => {
                switch (activeTab) {
                    case 'hoanthanh': return item.status === 5;
                    case 'dangxuly': return item.status === 2;
                    case 'dadonggoi': return item.status === 3;
                    case 'danggiao': return item.status === 4;
                    case 'dahuy': return item.status === 6;
                    case 'chothanhtoan': return item.status === 1;
                    default: return true;
                }
            });
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.id.toString().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    return (
        <div className="order-history">
            <h2 className="order-history__h2">Lịch sử đơn hàng</h2>

            <Container className="order-history__container">
                <Input
                    type="search"
                    placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="order-history__search mb-4"
                />

                <Nav tabs className="order-history__nav-tabs">
                    <NavItem className="order-history__nav-item">
                        <NavLink
                            className={`order-history__nav-link ${activeTab === 'hoanthanh' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hoanthanh')}
                        >
                            Hoàn thành
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === 'dangxuly' ? 'active' : ''}
                            onClick={() => setActiveTab('dangxuly')}
                        >
                            Đang xử lý
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === 'dadonggoi' ? 'active' : ''}
                            onClick={() => setActiveTab('dadonggoi')}
                        >
                            Đã đóng gói
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === 'danggiao' ? 'active' : ''}
                            onClick={() => setActiveTab('danggiao')}
                        >
                            Đang giao
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === 'dahuy' ? 'active' : ''}
                            onClick={() => setActiveTab('dahuy')}
                        >
                            Đã hủy
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === 'chothanhtoan' ? 'active' : ''}
                            onClick={() => setActiveTab('chothanhtoan')}
                        >
                            Chờ thanh toán
                        </NavLink>
                    </NavItem>
                </Nav>

                {filterOrders().length > 0 ? (
                    filterOrders().map((item, index) => (
                        <OrderCard item={item} key={index} />
                    ))
                ) : (
                    <div className="order-history__empty-state">
                        <img
                            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706155228-0-empty-order-history.svg"
                            alt="Không có đơn hàng"
                            className="order-history__empty-image"
                        />
                        <h4 className="order-history__empty-title">Không có đơn hàng nào</h4>
                        <p className="order-history__empty-text">Hãy thêm sản phẩm vào giỏ hàng và tạo đơn hàng của bạn ngay hôm nay!</p>
                        <button
                            className="order-history__buy-btn"
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