import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPromotionApi } from '../../redux/slices/promotionSlice';
import './../styles/Promotion.css';

const Promotion = () => {
    const dispatch = useDispatch();
    const promotions = useSelector((state) => state.promotion.promotions);

    useEffect(() => {
        dispatch(getAllPromotionApi());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="promotion-container">
            <div className="promotion-header">
                <h2 className="promotion-title">Mã giảm giá</h2>
                <a href="#" className="promotion-history">Lịch sử mã giảm giá</a>
            </div>

            <div className="promotion-grid">
                {Array.isArray(promotions) && promotions.map((promotion) => (
                    <div key={promotion?.id} className="promotion-card">
                        <div className="promotion-card-left">
                            <div className="pharmacy-logo">
                                <span>Pharma City</span>
                            </div>
                        </div>
                        <div className="promotion-card-right">
                            <h3 className="promotion-code">"{promotion?.name}"</h3>
                            <p className="promotion-description">
                                {promotion?.description}
                            </p>
                            <div className="promotion-footer">
                                <p className="promotion-expiry">
                                    HSD: {formatDate(promotion?.endDate)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotion;