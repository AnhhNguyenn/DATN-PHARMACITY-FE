import { Button } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import {
    addProductToCartApi
} from "../../../redux/slices/cartSlice";
import { VND } from "../../../utils/convertVND";
import "../../styles/product-card.css";
const ProductCard = (props) => {
    const { item } = props;
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const addToCart = () => {
        const data = {
            idProduct: item.id,
            quantity: 1,
            price: item.price,
        };
        const fetchAddProductToCartApi = async () => {
            dispatch(addProductToCartApi(data));
            toast.success(`Thêm ${item.name} vào giỏ hàng thành công!`);
        };
        if (user !== undefined) {
            fetchAddProductToCartApi();
        } else {
            toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
        }
    };
    return (
        <Col lg="3" md="4" sm="6" xs="12" className="mb-4">
            <div className="product__item">
                <div className="product__img">
                    <motion.img
                        whileHover={{ scale: 0.9 }}
                        src={item.pathImg}
                        alt="productImg"
                    />
                </div>
                <div className="product__info">
                    <div>
                        <h3 className="product__name">
                            <Link reloadDocument to={`/shop/${item.id}`}>
                                {item.name}
                            </Link>
                        </h3>
                        <span>{item.categoryName}</span>
                        <div className="product__card-bottom d-flex align-items-center justify-content-between">
                            <span className="price">{VND.format(item.price)}</span>
                        </div>
                    </div>
                    <div className="product__button-container">
                        <Button type="primary" block onClick={addToCart}>
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default ProductCard;
