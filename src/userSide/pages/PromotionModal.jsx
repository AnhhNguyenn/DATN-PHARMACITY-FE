import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPromotionApi } from '../../redux/slices/promotionSlice';
import './../styles/promotion-modal.css';

const PromotionModal = ({ isOpen, onClose, onApply }) => {
    const dispatch = useDispatch();
    const promotions = useSelector((state) => state.promotion.promotions);
    const [selectedPromotions, setSelectedPromotions] = useState(new Set());

    useEffect(() => {
        dispatch(getAllPromotionApi());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const handleSelect = (promotion) => {
        const newSelected = new Set(selectedPromotions);
        if (newSelected.has(promotion)) {
            newSelected.delete(promotion);
        } else {
            newSelected.add(promotion);
        }
        setSelectedPromotions(newSelected);
    };

    const handleApply = () => {
        if (selectedPromotions.size > 0) {
            const promotionsArray = Array.from(selectedPromotions);
            localStorage.setItem("promotion", JSON.stringify(promotionsArray[0])); // Lưu promotion đầu tiên
            onApply(promotionsArray);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="promotion-modal-overlay">
            <div className="promotion-modal">
                <div className="promotion-modal-header">
                    <h2>Chọn Mã khuyến mãi</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="promotion-modal-content">
                    <div className="promotion-list">
                        {Array.isArray(promotions) && promotions.map((promotion) => (
                            <div
                                key={promotion?.id}
                                className={`promotion-card ${selectedPromotions.has(promotion) ? 'selected' : ''}`}
                            >
                                <div className="promotion-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedPromotions.has(promotion)}
                                        onChange={() => handleSelect(promotion)}
                                    />
                                </div>
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
                <div className="promotion-modal-footer">
                    <button
                        className="apply-button"
                        onClick={handleApply}
                        disabled={selectedPromotions.size === 0}
                    >
                        Áp dụng ({selectedPromotions.size})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromotionModal;