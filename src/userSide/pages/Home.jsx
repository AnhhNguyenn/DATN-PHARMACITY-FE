import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "reactstrap";

import Services from "../components/UI/Services";
import SanDeal from '../pages/SanDeal';

import "../styles/home.css";

import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsApi } from "../../redux/slices/productSlice";


import ProductsList from "../components/UI/ProductsList";

import Helmet from "../components/Helmet/Helmet";

import banner1 from "../../assets/images/pharmacity/banners/Banner1.avif";
import banner2 from "../../assets/images/pharmacity/banners/banner2.avif";
import banner3 from "../../assets/images/pharmacity/banners/banner3.avif";
import banner4 from "../../assets/images/pharmacity/banners/banner4.avif";
import banner5 from "../../assets/images/pharmacity/banners/banner5.avif";

import { getChatResponse } from "./../../utils/chatService";

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

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Xin chào! Tôi có thể giúp gì cho bạn?'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            content: inputMessage
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Get response from ChatGPT
            const response = await getChatResponse(inputMessage);

            console.log('Bot response:', response);

            // Add bot response
            const botMessage = {
                type: 'bot',
                content: response
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                type: 'bot',
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {!isOpen && (
                <motion.div
                    className="chat-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleChat}
                >
                    <img
                        src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240716084109-0-zalo-chat.png"
                        alt="Chat"
                        className="chat-icon"
                    />
                </motion.div>
            )}

            {isOpen && (
                <motion.div
                    className="chat-popup"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <div className="chat-popup__header">
                        <h3>Chat với AI</h3>
                        <button className="chat-popup__close" onClick={toggleChat}>×</button>
                    </div>
                    <div className="chat-popup__body">
                        <div className="chat-popup__messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`chat-popup__message chat-popup__message--${msg.type}`}
                                >
                                    {msg.type === 'bot' ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: msg.content }}
                                        />
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chat-popup__message chat-popup__message--bot">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="chat-popup__input">
                            <input
                                type="text"
                                placeholder="Nhập tin nhắn..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products?.data || []);
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
        dispatch(getAllProductsApi({ pageNumber: 1, pageSize: 100 }));
    }, [dispatch]);

    useEffect(() => {
        const currentDate = new Date();
        if (products && products.length > 0) {
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
            <SanDeal />
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
            <ChatButton />
        </Helmet>
    );
};

export default Home;