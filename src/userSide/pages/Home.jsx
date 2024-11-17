// Home.jsx
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import Clock from "../components/UI/Clock";
import Services from "../components/UI/Services";
import "../styles/home.css";

import ProductsList from "../components/UI/ProductsList";

import counterImg from "../../assets/images/counter-timer-img.png";
import heroImg from "../../assets/images/hero-img.png";
import Helmet from "../components/Helmet/Helmet";

import banner1 from "../../assets/images/pharmacity/banners/Banner1.avif";
import banner2 from "../../assets/images/pharmacity/banners/banner2.avif";
import banner3 from "../../assets/images/pharmacity/banners/banner3.avif";
import banner4 from "../../assets/images/pharmacity/banners/banner4.avif";
import banner5 from "../../assets/images/pharmacity/banners/banner5.avif";

import { useSelector } from "react-redux";

const BannerCarousel = ({ images, sideBanners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalTime = 10000; // 10 seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setProgress(0);
        }, intervalTime);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + (100 / (intervalTime / 100));
            });
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        };
    }, [images.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setProgress(0);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setProgress(0);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        setProgress(0);
    };

    return (
        <section className="banner__section">
            <div className="banner__wrapper">
                <div className="banner__container">
                    <div
                        className="banner__slider"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        <div className="banner__images">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Banner ${index + 1}`}
                                    className="banner__image"
                                />
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="banner__nav banner__nav--prev"
                        onClick={handlePrev}
                    >
                        <svg className="banner__nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="banner__nav banner__nav--next"
                        onClick={handleNext}
                    >
                        <svg className="banner__nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>

                    <div className="banner__dots">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`banner__dot ${index === currentIndex ? "banner__dot--active" : ""}`}
                                onClick={() => handleDotClick(index)}
                                style={index === currentIndex ? { '--progress': `${progress}%` } : {}}
                            />
                        ))}
                    </div>

                </div>

                <div className="banner__side">
                    {sideBanners.map((banner, index) => (
                        <div key={index} className="banner__side-item">
                            <img src={banner} alt={`Side banner ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const products = useSelector((state) => state.product.products);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    const bannerImages = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
    ];

    const sideBanners = [
        banner1,
        banner2,
    ];

    useEffect(() => {
        const currentDate = new Date();
        if (products.lenght !== 0) {
            const filterNewProducts = products
                .filter((item) => {
                    const productCreatedDate = new Date(item.createAt);
                    return (
                        parseFloat(
                            (currentDate - productCreatedDate) /
                            (1000 * 60 * 60 * 24)
                        ) < 30
                    );
                })
                .slice(0, 8);

            const filterTrendingProducts = products
                .filter((item) => item.slug === "thuc-pham-chuc-nang")
                .slice(0, 4);

            setNewProducts(filterNewProducts);
            setTrendingProducts(filterTrendingProducts);
        }
    }, [products]);

    return (
        <Helmet title={"Home"}>
            <BannerCarousel images={bannerImages} sideBanners={sideBanners} />
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6">
                            <div className="hero__content">
                                <h1>NHÀ THUỐC LAS</h1>
                                <h2>Đem đến sự hài lòng cho khách hàng</h2>
                                <motion.button
                                    whileTap={{ scale: 1.1 }}
                                    className="buy__btn"
                                >
                                    <Link to={currentUser ? "/shop" : "/login"}>
                                        Mua Ngay
                                    </Link>
                                </motion.button>
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="6">
                            <img src={heroImg} alt="heroImg" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <Services />

            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title">
                                Sản phẩm thịnh hành
                            </h2>
                        </Col>
                        {trendingProducts ? (
                            <ProductsList data={trendingProducts} />
                        ) : (
                            <></>
                        )}
                    </Row>
                </Container>
            </section>

            <section className="timer__count">
                <Container>
                    <Row className="timer__count--row">
                        <Col lg="6" md="6" className="count__down-col">
                            <div className="clock__top-content">
                                <h4 className="text-white fs-6 mb-2">
                                    Ưu đãi số lượng có hạn
                                </h4>
                            </div>
                            <Clock />
                            <motion.button
                                whileTap={{ scale: 1.2 }}
                                className="buy__btn store__btn"
                            >
                                <Link to="shop">Ghé thăm cửa hàng</Link>
                            </motion.button>
                        </Col>
                        <Col lg="6" md="6" className="text-end counter__img">
                            <img src={counterImg} alt="#" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="new__arrivals">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title">
                                Những sản phẩm mới
                            </h2>
                        </Col>
                        {newProducts ? (
                            <ProductsList data={newProducts} />
                        ) : (
                            <></>
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Home;