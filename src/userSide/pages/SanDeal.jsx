import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import './../styles/SanDeal.css';
import { useNavigate } from 'react-router-dom';
import { VND } from '../../utils/convertVND';

const SanDeal = () => {
    const navigate = useNavigate();
    const [dealProducts, setDealProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        hours: 3,
        minutes: 0,
        seconds: 38
    });
    const products = useSelector((state) => state.product.products?.data || []);
    const productsPerPage = 5;

    const handleProductClick = (productId) => {
        navigate(`/shop/${productId}`);
    };

    const slugs = ['cham-soc-suc-khoe', 'duoc-pham', 'thuc-pham-chuc-nang', 'cham-soc-sac-dep'];

    useEffect(() => {
        if (products && products.length > 0) {
            const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
            const filteredProducts = products
                .filter((item) => item.slug === randomSlug)
                .slice(0, 15)
                .map(product => ({
                    ...product,
                    discount: Math.floor(Math.random() * 31 + 20), // Random discount 20-50%
                    sold: Math.floor(Math.random() * 10000),
                    likes: Math.floor(Math.random() * 50000)
                }));
            setDealProducts(filteredProducts);
        }
    }, [products]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
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

    const handleNext = () => {
        setCurrentIndex(prev => prev + productsPerPage);
    };

    const handlePrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - productsPerPage));
    };

    const visibleProducts = dealProducts.slice(currentIndex, currentIndex + productsPerPage);
    const showPrevious = currentIndex > 0;
    const showNext = currentIndex + productsPerPage < dealProducts.length;

    return (
        <section className="san-deal__section">
            <Container>
                <div className="san-deal__header">
                    <div className="san-deal__title">
                        <h2>⚡ SănDeal</h2>
                        <div className="san-deal__timer">
                            <div className="san-deal__timer-box">{String(timeLeft.hours).padStart(2, '0')}</div>
                            <span className="san-deal__timer-separator">:</span>
                            <div className="san-deal__timer-box">{String(timeLeft.minutes).padStart(2, '0')}</div>
                            <span className="san-deal__timer-separator">:</span>
                            <div className="san-deal__timer-box">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        </div>
                    </div>
                    <a href="/shop" className="san-deal__view-more">Xem thêm</a>
                </div>

                <div className="san-deal__container">
                    {showPrevious && (
                        <button className="san-deal__nav-button san-deal__nav-button--prev" onClick={handlePrevious}>
                        </button>
                    )}

                    <div className="san-deal__products">
                        {visibleProducts.map((product, index) => (
                            <div key={index} className="san-deal__product-card">
                                <div className="san-deal__product-image">
                                    <span className="san-deal__discount-badge">Giảm {product.discount}%</span>
                                    <img src={product.pathImg} alt={product.name} />
                                </div>
                                <div className="san-deal__product-info">
                                    <div className="san-deal__product-name">{product.name}</div>
                                    <div className="san-deal__price-container">
                                        <span className="san-deal__current-price">
                                            {VND.format(product.price * (1 - product.discount / 100))}
                                        </span>
                                        <span className="san-deal__original-price">{VND.format(product.price)}</span>
                                    </div>
                                    <div className="san-deal__stats">
                                        <span>❤️ {product.likes}</span>
                                        <span>Đã bán {product.sold}</span>
                                    </div>
                                    <button
                                        className="san-deal__buy-button"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        Chọn sản phẩm
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {showNext && (
                        <button className="san-deal__nav-button san-deal__nav-button--next" onClick={handleNext}>
                        </button>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default SanDeal;