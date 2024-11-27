import React, { useState, useEffect } from "react";
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
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    // Lấy thông tin user từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const categories = [
        {
            icon: <Pill className="category__item-icon" />,
            name: "Dược phẩm",
            slug: "duoc-pham"
        },
        {
            icon: <Heart className="category__item-icon" />,
            name: "Chăm sóc sức khoẻ",
            slug: "cham-soc-suc-khoe"
        },
        {
            icon: <Sparkles className="category__item-icon" />,
            name: "Chăm sóc sắc đẹp",
            slug: "cham-soc-sac-dep"
        },
        {
            icon: <Leaf className="category__item-icon" />,
            name: "Thực phẩm chức năng",
            slug: "thuc-pham-chuc-nang"
        }
    ];

    const handleCategoryClick = (slug) => {
        navigate(`/shop?slug=${slug}`);
    };

    // Lấy products từ Redux store
    const products = useSelector((state) => state.product.products?.data || []);

    const handleSearch = (value) => {
        setSearchValue(value);
        if (value.trim() === "") {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        const filtered = products.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);

        setSearchResults(filtered);
        setShowSearchResults(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search__wrapper')) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogin = () => {
        setShowLogin(true);
        setShowSignup(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload(false);
    };

    return (
        <>
            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    setShowSignup={setShowSignup}
                    setShowLogin={setShowLogin}
                />
            )}
            {showSignup && (
                <Signup
                    onClose={() => setShowSignup(false)}
                    setShowSignup={setShowSignup}
                    setShowLogin={setShowLogin}
                />
            )}
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
                                value={searchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => setShowSearchResults(true)}
                            />
                            {showSearchResults && searchResults.length > 0 && (
                                <div className="search__results">
                                    {searchResults.map((product) => (
                                        <Link
                                            key={product.id}
                                            to={`/shop/${product.id}`}
                                            className="search__result-item"
                                            onClick={() => {
                                                setShowSearchResults(false);
                                                setSearchValue("");
                                            }}
                                        >
                                            <div className="search__result-image">
                                                {product.pathImg ? (
                                                    <img
                                                        src={product.pathImg}
                                                        alt={product.name}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/50';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="placeholder-image">
                                                        <Package size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="search__result-info">
                                                <span className="product-name">{product.name}</span>
                                                <span className="product-price">
                                                    {product.price?.toLocaleString()}đ
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="header__actions">
                            <button className="action__button">
                                <Bell size={24} />
                            </button>
                            <Link to="/cart" className="action__button cart-button">
                                <ShoppingCart size={24} />
                                {cartItemCount > 0 && (
                                    <span className="cart-badge">{cartItemCount}</span>
                                )}
                            </Link>
                            <div className="vertical-divider"></div>

                            {user ? (
                                <div className="user__menu">
                                    <button className="login__button">
                                        {user.pathImg ? (
                                            <img
                                                src={user.pathImg}
                                                alt="Avatar"
                                                className="user-avatar"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.style.display = 'none';
                                                    const parent = e.target.parentElement;
                                                    const fallbackIcon = document.createElement('span');
                                                    fallbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                                                    parent.insertBefore(fallbackIcon, e.target);
                                                }}
                                            />
                                        ) : (
                                            <User size={20} />
                                        )}
                                        <span>Chào, {user.name?.split(' ').pop()}</span>
                                        <ChevronDown size={16} className="chevron" />
                                    </button>

                                    <div className="user__dropdown">
                                        <Link to="/profile" className="dropdown__item">
                                            <User size={16} />
                                            <span>Thông tin cá nhân</span>
                                        </Link>
                                        <Link to="/order" className="dropdown__item">
                                            <Clock size={16} />
                                            <span>Lịch sử đơn hàng</span>
                                        </Link>
                                        <Link to="/promotion" className="dropdown__item">
                                            <Package size={16} />
                                            <span>Mã giảm giá</span>
                                        </Link>
                                        <button className="dropdown__item logout" onClick={handleLogout}>
                                            <LogOut size={16} />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button className="login__button" onClick={handleLogin}>
                                    <User size={20} />
                                    <span>Đăng nhập</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="header__bottom">
                        <div className="category__wrapper">
                            <button className="category__button">
                                <Menu size={20} />
                                Danh mục
                                <ChevronDown size={16} className="chevron" />
                            </button>
                            <div className="category__dropdown">
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        className="category__item"
                                        onClick={() => handleCategoryClick(category.slug)}
                                    >
                                        {category.icon}
                                        <span>{category.name}</span>
                                    </button>
                                ))}
                            </div>
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
        </>
    );
};

export default Header;