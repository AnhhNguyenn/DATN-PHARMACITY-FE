import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./../styles/SanDeal.css";

const SanDeal = () => {
  const products = useSelector((state) => state.product.products);
  const [dealProducts, setDealProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 28,
    minutes: 54,
    seconds: 0,
  });
  const containerRef = useRef(null);

  useEffect(() => {
    // Filter products from different categories
    if (products.length !== 0) {
      const categories = [
        "cham-soc-suc-khoe",
        "duoc-pham",
        "thuc-pham-chuc-nang",
        "cham-soc-sac-dep",
      ];
      const selectedProducts = products
        .filter((item) => categories.includes(item.slug))
        .sort(() => Math.random() - 0.5) // Shuffle array
        .slice(0, 10); //

      // Add mock discount data
      const productsWithDiscount = selectedProducts.map((product) => ({
        ...product,
        discountPercent: Math.floor(Math.random() * 3 + 1) * 10, // 10%, 20% or 30%
        originalPrice: product.price,
        price:
          product.price * (1 - (Math.floor(Math.random() * 3 + 1) * 10) / 100),
        likes: Math.floor(Math.random() * 50000 + 10000),
        sold: Math.floor(Math.random() * 10000 + 1000),
      }));

      setDealProducts(productsWithDiscount);
    }
  }, [products]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className="san-deal__section">
      <div className="san-deal__header">
        <div className="san-deal__title">
          <h2>⚡Săn Deal</h2>
          <div className="san-deal__timer">
            <div className="san-deal__timer-box">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="san-deal__timer-separator">:</span>
            <div className="san-deal__timer-box">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="san-deal__timer-separator">:</span>
            <div className="san-deal__timer-box">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
        <Link to="/shop" className="san-deal__view-more">
          Xem thêm
        </Link>
      </div>

      <div className="san-deal__container">
        <div className="san-deal__products" ref={containerRef}>
          {dealProducts.map((product) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={product.id}
              className="san-deal__product-card"
            >
              <div className="san-deal__product-image">
                <div className="san-deal__discount-badge">
                  Giảm {product.discountPercent}%
                </div>
                <img
                  src={product.imgUrl || "/api/placeholder/240/240"}
                  alt={product.productName}
                />
              </div>
              <div className="san-deal__product-info">
                <h3 className="san-deal__product-name">
                  {product.productName}
                </h3>
                <div className="san-deal__price-container">
                  <span className="san-deal__current-price">
                    {product.price.toLocaleString()}đ
                  </span>
                  <span className="san-deal__original-price">
                    {product.originalPrice.toLocaleString()}đ
                  </span>
                </div>
                <div className="san-deal__stats">
                  <span>❤️ {(product.likes / 1000).toFixed(1)}k</span>
                  <span>Đã bán {(product.sold / 1000).toFixed(1)}k</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="san-deal__buy-button"
                >
                  Chọn sản phẩm
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="san-deal__nav-button san-deal__nav-button--prev"
          onClick={() => handleScroll("left")}
        >
          <svg className="san-deal__nav-icon" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="san-deal__nav-button san-deal__nav-button--next"
          onClick={() => handleScroll("right")}
        >
          <svg className="san-deal__nav-icon" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </section>
  );
};

export default SanDeal;
