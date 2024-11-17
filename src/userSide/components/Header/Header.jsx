// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import logo from "../../../assets/images/pharmacity/pharmacity-logo.svg";
import "./header.css";

const Header = () => {
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
            <button className="login__button">
              <User size={20} />
              Đăng nhập / Đăng ký
            </button>
          </div>
        </div>

        {/* Second Row */}
        <div className="header__bottom">
          <div className="category__wrapper">
            <button className="category__button">
              <Menu size={20} />
              Danh mục
              <ChevronDown size={16} />
            </button>
          </div>

          <nav className="main__nav">
            <Link to="/" className="nav__link">
              Trang chủ
            </Link>
            <Link to="/shop" className="nav__link">
              Cửa hàng
            </Link>
            <Link to="/cart" className="nav__link">
              Giỏ hàng
            </Link>
            <Link to="/order" className="nav__link">
              Lịch sử mua hàng
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
