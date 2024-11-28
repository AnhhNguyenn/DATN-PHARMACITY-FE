import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Progress } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCartApi, getAllCartItemApi } from "../../redux/slices/cartSlice";
import { getAllProductsApi } from "../../redux/slices/productSlice";
import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";
import "../styles/product-details.css";
import { toast } from "react-toastify";
import { getDetailService } from "../../services/productService";
import { VND } from "../../utils/convertVND";

const ProductDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState({});
    const [countAddCart, setCountAddCart] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllProductsApi({ pageNumber: 1, pageSize: 99999 }));
    }, [dispatch]);

    // Fetch product details
    useEffect(() => {
        const fetchDetailProductApi = async () => {
            try {
                setLoading(true);
                const responeProduct = await getDetailService(id);
                const productDetail = {
                    id: responeProduct.data?.id,
                    name: responeProduct.data?.name,
                    image: responeProduct.data?.pathImg,
                    price: responeProduct.data?.price,
                    description: responeProduct.data?.detail,
                    category: responeProduct.category?.name,
                    type: responeProduct.data?.type,
                    quantity: responeProduct.data?.quantity,
                    idCategory: responeProduct.category?.id,
                };
                setProductDetail(productDetail);
            } catch (error) {
                toast.error("Không thể tải thông tin sản phẩm!");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchDetailProductApi();
        }
    }, [id]);

    const products = useSelector((state) => state.product.products) || [];
    const relatedProducts = products && products.length > 0
        ? products.filter(item => item.idCategory === productDetail.idCategory)
        : [];

    const addToCart = async (shouldNavigateToCart = false) => {
        if (!user) {
            toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        if (countAddCart > productDetail.quantity) {
            toast.error("Số lượng vượt quá số lượng có sẵn!");
            return;
        }

        const data = {
            idProduct: productDetail.id,
            quantity: countAddCart,
            price: productDetail.price,
        };

        try {
            setLoadingCart(true);
            await dispatch(addProductToCartApi(data)).unwrap();
            await dispatch(getAllCartItemApi()).unwrap();
            toast.success(`Thêm ${productDetail.name} vào giỏ hàng thành công!`);

            if (shouldNavigateToCart) {
                navigate('/cart');
            }
        } catch (error) {
            toast.error("Không thể thêm vào giỏ hàng!");
        } finally {
            setLoadingCart(false);
        }
    };

    const handleBuyNow = () => {
        addToCart(true);
    };

    const handleDecrementCount = () => {
        setCountAddCart(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleIncrementCount = () => {
        setCountAddCart(prev =>
            prev < productDetail.quantity ? prev + 1 : productDetail.quantity
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productDetail]);

    if (loading) {
        return (
            <div className="loading--api">
                <Spinner animation="grow" variant="success" />
            </div>
        );
    }

    return (
        <Helmet title={productDetail.name}>
            {loadingCart && <Progress animated value="100" className="progress" />}
            <section>
                <Container>
                    <div className="product__container">
                        <Row>
                            <Col lg="5">
                                <div className="product__image-container">
                                    {productDetail.image && (
                                        <img
                                            className="product__image"
                                            src={productDetail.image}
                                            alt={productDetail.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'placeholder-image-url';
                                            }}
                                        />
                                    )}
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="product__details">
                                    <h1 className="product__title">{productDetail.name}</h1>
                                    <span className="product__category">Danh mục: {productDetail.category}</span>

                                    <div className="product__price-container">
                                        <span className="final-price">{VND.format(productDetail.price * countAddCart)}</span>
                                    </div>

                                    {/* Action Buttons - Di chuyển lên trên */}
                                    <div className="action__buttons">
                                        <button
                                            className="buy__now"
                                            onClick={handleBuyNow}
                                            disabled={loadingCart}>
                                            Mua ngay
                                        </button>
                                        <button
                                            className="add__cart"
                                            onClick={addToCart}
                                            disabled={loadingCart}
                                        >
                                            Thêm vào giỏ
                                        </button>
                                    </div>

                                    {/* Quantity Control */}
                                    <div className="quantity__wrapper">
                                        <span className="quantity__label">Số lượng</span>
                                        <div className="quantity__control">
                                            <button className="quantity__btn" onClick={handleDecrementCount}>-</button>
                                            <input
                                                className="quantity__input"
                                                type="text"
                                                value={countAddCart}
                                                readOnly
                                            />
                                            <button className="quantity__btn" onClick={handleIncrementCount}>+</button>
                                        </div>
                                    </div>

                                    {/* Detail Section */}
                                    <div className="product__description">
                                        <h3 className="description__title">Giới thiệu sản phẩm</h3>
                                        <p className="description__text">{productDetail.description}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            <section>
                <Container>
                    <Row className="text-center mb-5">
                        <h1>Các sản phẩm tương tự</h1>
                    </Row>
                    <Row>
                        {!products ? (
                            <div className="loading--api">
                                <Spinner animation="grow" variant="success" />
                            </div>
                        ) : relatedProducts.length === 0 ? (
                            <h1 className="text-center fs-4">
                                Hiện tại không có sản phẩm tương tự!
                            </h1>
                        ) : (
                            <ProductsList data={relatedProducts} />
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default ProductDetails;