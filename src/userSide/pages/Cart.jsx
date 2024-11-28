import React, { useState } from "react";
import { Progress, Form, FormGroup } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartItemApi, getAllCartItemApi } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { VND } from "../../utils/convertVND";
import { decreaseItemService, increaseItemService } from "../../services/cartServices";
import PromotionModal from "./PromotionModal";
import Payment from "./Payment";
import { FormLabel } from "@themesberg/react-bootstrap";

import "../styles/cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined) {
        navigate("/login");
    }

    const [loadingDelete, setLoadingDelete] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
    const [appliedPromotions, setAppliedPromotions] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
        },
        validationSchema: Yup.object({
            phone: Yup.string().required("Số điện thoại là bắt buộc"),
            address: Yup.string().required("Địa chỉ là bắt buộc"),
        }),
    });

    const onSetOpen = () => {
        setOpen(!open);
    };

    const handleSubmit = () => {
        if (formik.isValid) {
            onSetOpen();
        }
    };

    const handleApplyPromotions = (promotions) => {
        setAppliedPromotions(promotions);
    };

    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(cartItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const calculateSelectedTotal = () => {
        return cartItems
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const CartHeader = () => (
        <div className="cart-header-row">
            <div className="cart-col checkbox">
                <input
                    type="checkbox"
                    checked={selectedItems.length === cartItems.length}
                    onChange={handleSelectAll}
                />
            </div>
            <div className="cart-col product">Sản phẩm</div>
            <div className="cart-col price">Đơn giá</div>
            <div className="cart-col quantity">Số lượng</div>
            <div className="cart-col total">Thành tiền</div>
            <div className="cart-col action"></div>
        </div>
    );

    const removeProductFromCart = (id) => {
        const fetchRemoveProductFromCartApi = async () => {
            setLoadingDelete(true);
            const result = await dispatch(deleteCartItemApi(id));
            if (result.status === 200) {
                toast.success("Xóa thành công!");
                setLoadingDelete(false);
                dispatch(getAllCartItemApi());
            }
        };
        fetchRemoveProductFromCartApi();
    };

    const handleIncrease = async (id) => {
        const result = await increaseItemService(id);
        if (result.status === 200) {
            dispatch(getAllCartItemApi());
        }
    };

    const handleDecrease = async (id) => {
        const result = await decreaseItemService(id);
        if (result.status === 200) {
            dispatch(getAllCartItemApi());
        }
    };

    const calculateTotalDiscount = () => {
        const subtotal = calculateSelectedTotal();
        let totalDiscount = 0;

        appliedPromotions.forEach(promotion => {
            if (promotion.discountPercentage) {
                totalDiscount += (subtotal * promotion.discountPercentage) / 100;
            }
        });

        return totalDiscount;
    };

    const calculateFinalTotal = () => {
        const subtotal = calculateSelectedTotal();
        const discount = calculateTotalDiscount();
        return subtotal - discount;
    };

    const EmptyCart = () => {
        return (
            <div className="empty-cart text-center">
                <img
                    src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706155710-0-empty-cart.png"
                    alt="Empty Cart"
                    style={{ width: "200px", marginBottom: "20px" }}
                />
                <h3>Chưa có sản phẩm nào</h3>
                <p>Hãy khám phá để mua sắm thêm</p>
                <Link to="/" className="discover-btn">
                    Khám phá ngay
                </Link>
            </div>
        );
    };

    const CartItem = ({ item }) => (
        <div className="cart-item-row">
            <div className="cart-col checkbox">
                <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                />
            </div>
            <div className="cart-col product">
                <div className="product-info">
                    <img src={item.pathImg} alt={item.name} />
                    <h3>{item.name}</h3>
                </div>
            </div>
            <div className="cart-col price">{VND.format(item.price)}</div>
            <div className="cart-col quantity">
                <div className="quantity-controls">
                    <button
                        onClick={() => handleDecrease(item.id)}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
            </div>
            <div className="cart-col total">{VND.format(item.price * item.quantity)}</div>
            <div className="cart-col action">
                <button className="delete-btn" onClick={() => removeProductFromCart(item.id)}>
                    <i className="ri-delete-bin-line"></i>
                </button>
            </div>
        </div>
    );

    const CheckoutForm = () => (
        <div className="checkout-section">
            <div className="user-info-container">
                <div className="header-container">
                    <h2 className="mb-0 fw-bold">Thông tin cá nhân</h2>
                    <button
                        className="btn btn-sm btn-primary edit-button"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                    </button>
                </div>
                <Form className="billing__form">
                    <FormGroup>
                        <FormLabel>Họ và tên</FormLabel>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            readOnly
                            value={formik.values.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            readOnly
                            value={formik.values.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Số điện thoại</FormLabel>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            readOnly={!isEditing}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="text-danger">{formik.errors.phone}</div>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Địa chỉ</FormLabel>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            readOnly={!isEditing}
                        />
                        {formik.errors.address && formik.touched.address && (
                            <div className="text-danger">{formik.errors.address}</div>
                        )}
                    </FormGroup>
                </Form>
            </div>
        </div>
    );

    return (
        <Helmet title="Cart">
            {loadingDelete && <Progress animated value="100" className="progress" />}
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Giỏ hàng ({cartItems.length})</h2>
                </div>

                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <div className="free-shipping-banner">
                            <img
                                src="https://prod-cdn.pharmacity.io/e-com/images/ecommerce/20240219101015-0-Delivery%20van.png"
                                alt="Delivery"
                                className="delivery-icon"
                            />
                            <span>Miễn phí vận chuyển cho mọi đơn hàng từ 0đ</span>
                        </div>

                        <div className="cart-content">
                            <div className="cart-main">
                                <div className="cart-items">
                                    <CartHeader />
                                    {cartItems.map(item => <CartItem key={item.id} item={item} />)}
                                </div>

                                <div className="mt-4">
                                    <CheckoutForm />
                                </div>
                            </div>

                            <div className="cart-summary">
                                <div className="promotion-section">
                                    <div className="promotion-header">
                                        <span>Khuyến mãi</span>
                                        <button onClick={() => setIsPromotionModalOpen(true)}>
                                            {appliedPromotions.length > 0
                                                ? `${appliedPromotions.length} mã được chọn`
                                                : 'Chọn mã'}
                                        </button>
                                    </div>
                                    {appliedPromotions.length > 0 && (
                                        <div className="applied-promotions">
                                            {appliedPromotions.map(promo => (
                                                <div key={promo.id} className="applied-promotion">
                                                    <span>{promo.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <PromotionModal
                                    isOpen={isPromotionModalOpen}
                                    onClose={() => setIsPromotionModalOpen(false)}
                                    onApply={handleApplyPromotions}
                                />

                                <div className="price-summary">
                                    <div className="summary-row">
                                        <span>Tạm tính</span>
                                        <span>{VND.format(calculateSelectedTotal())}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Giảm giá ưu đãi</span>
                                        <span>{VND.format(calculateTotalDiscount())}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Tổng tiền</span>
                                        <span className="total-amount">
                                            {VND.format(calculateFinalTotal())}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="checkout-button"
                                    onClick={handleSubmit}
                                    disabled={selectedItems.length === 0}
                                >
                                    {isCheckingOut ? 'Đặt hàng' : 'Tiến hành đặt hàng'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {open && <Payment open={open} onSetOpen={onSetOpen} />}
        </Helmet>
    );
};

export default Cart;