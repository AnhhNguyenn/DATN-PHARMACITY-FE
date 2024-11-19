import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Bell,
    ChevronDown,
    Menu,
    Search,
    ShoppingCart,
    User,
    Truck,
    Clock,
    Package,
    MapPin,
    Pill,
    Heart,
    Sparkles,
    Leaf,
    LogOut
} from "lucide-react";
import logo from "../../../assets/images/pharmacity/pharmacity-logo.svg";
import "./header.css";

const Header = () => {
    const navigate = useNavigate();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Lấy thông tin user từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const categories = [
        {
            icon: <Pill className="category__item-icon" />,
            name: "Dược phẩm"
        },
        {
            icon: <Heart className="category__item-icon" />,
            name: "Chăm sóc sức khoẻ"
        },
        {
            icon: <Sparkles className="category__item-icon" />,
            name: "Chăm sóc sắc đẹp"
        },
        {
            icon: <Leaf className="category__item-icon" />,
            name: "Thực phẩm chức năng"
        }
    ];

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload(false);
    };

    return (
        <header className="header">
            <div className="container">
                {/* First Row */}
                <div className="header__top">
                    <Link to="/" className="logo">
                        <img src={logo} alt="Logo" />
                    </Link>

                    <div className="search__wrapper">
                        <button className="search__button">
                            <Search size={20} />
                        </button>
                        <input
                            type="text"
                            className="search__input"
                            placeholder="Tên thuốc, triệu chứng, vitamin và thực phẩm chức năng"
                        />
                    </div>

                    <div className="header__actions">
                        <button className="action__button">
                            <Bell size={24} />
                        </button>
                        <Link to="/cart" className="action__button">
                            <ShoppingCart size={24} />
                        </Link>
                        <div className="vertical-divider"></div>

                        {user ? (
                            <div className="user__menu">
                                <button
                                    className="login__button"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <User size={20} />
                                    {user.name}
                                    <ChevronDown size={16} className={`chevron ${isUserMenuOpen ? 'rotate' : ''}`} />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="user__dropdown">
                                        <Link to="/profile" className="dropdown__item">
                                            <User size={16} />
                                            <span>Tài khoản</span>
                                        </Link>
                                        <button className="dropdown__item" onClick={handleLogout}>
                                            <LogOut size={16} />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="login__button" onClick={handleLogin}>
                                <User size={20} />
                                Đăng nhập / Đăng ký
                            </button>
                        )}
                    </div>
                </div>

                {/* Second Row */}
                <div className="header__bottom">
                    <div className="category__wrapper">
                        <button
                            className={`category__button ${isCategoryOpen ? 'active' : ''}`}
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                            <Menu size={20} />
                            Danh mục
                            <ChevronDown size={16} className={`chevron ${isCategoryOpen ? 'rotate' : ''}`} />
                        </button>
                        {isCategoryOpen && (
                            <div className="category__dropdown">
                                {categories.map((category, index) => (
                                    <Link to="#" key={index} className="category__item">
                                        {category.icon}
                                        <span>{category.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <nav className="main__nav">
                        <Link to="/" className="nav__link">Trang chủ</Link>
                        <Link to="/shop" className="nav__link">Cửa hàng</Link>
                        <Link to="/cart" className="nav__link">Giỏ hàng</Link>
                        <Link to="/order" className="nav__link">Lịch sử mua hàng</Link>
                    </nav>
                </div>
            </div>

            {/* Service Features */}
            <div className="service__features__wrapper">
                <div className="service__features">
                    <div className="feature">
                        <Clock className="feature__icon" size={24} />
                        <div className="feature__text">
                            <h4>Giao hàng siêu tốc</h4>
                            <p>Giao tận nhà hoặc nhận tại nhà thuốc</p>
                        </div>
                    </div>
                    <div className="feature">
                        <Package className="feature__icon" size={24} />
                        <div className="feature__text">
                            <h4>Đủ thuốc chuẩn</h4>
                            <p>Thuốc chất lượng, phục vụ tận tình</p>
                        </div>
                    </div>
                    <div className="feature">
                        <Truck className="feature__icon" size={24} />
                        <div className="feature__text">
                            <h4>Miễn phí vận chuyển</h4>
                            <p>Cho mọi đơn hàng toàn quốc</p>
                        </div>
                    </div>
                    <div className="feature">
                        <MapPin className="feature__icon" size={24} />
                        <div className="feature__text">
                            <h4>Nhà thuốc gần bạn</h4>
                            <p>Dễ dàng tìm nhà thuốc gần bạn</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;