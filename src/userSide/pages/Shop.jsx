import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsToShopApi } from "../../redux/slices/productSlice";
import { useLocation } from "react-router-dom";
import "../styles/shop.css";

const Shop = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products || []);
    const [productsData, setProductsData] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]); 
    const [currentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [tempMinPrice, setTempMinPrice] = useState("");
    const [tempMaxPrice, setTempMaxPrice] = useState("");
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState(""); 
    const [sortOrder, setSortOrder] = useState("none");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const itemsPerPage = 20;

    const slugToVietnamese = {
        "thuc-pham-chuc-nang": "Thực phẩm chức năng",
        "cham-soc-sac-dep": "Chăm sóc sắc đẹp",
        "duoc-pham": "Dược phẩm",
        "cham-soc-suc-khoe": "Chăm sóc sức khỏe",
    };

    const priceRanges = [
        { label: "Dưới 100.000 đ", min: 0, max: 100000 },
        { label: "100.000 đ - 300.000 đ", min: 100000, max: 300000 },
        { label: "300.000 đ - 500.000 đ", min: 300000, max: 500000 },
        { label: "Trên 500.000 đ", min: 500000, max: Infinity },
    ];

    useEffect(() => {
        dispatch(getAllProductsToShopApi({ pageNumber: currentPage, pageSize: 100 }));
    }, [currentPage, dispatch]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const slugFromUrl = queryParams.get("slug");
        if (slugFromUrl) {
            setSelectedSlug(slugFromUrl);
        }
    }, [location.search]);

    useEffect(() => {
        if (products.data) {
            setProductsData(products.data);
        }
    }, [products]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        let filtered = products.data || [];

        // Lọc theo tìm kiếm
        if (searchValue) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Lọc theo khoảng giá tùy chỉnh
        if (minPrice && maxPrice) {
            filtered = filtered.filter(
                (item) =>
                    item.price >= Number(minPrice) && item.price <= Number(maxPrice)
            );
        }

        // Lọc theo checkbox khoảng giá
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter((item) =>
                selectedPriceRanges.some(
                    (range) =>
                        item.price >= range.min && item.price <= range.max
                )
            );
        }

        // Lọc theo slug
        if (selectedSlug) {
            filtered = filtered.filter((item) => item.slug === selectedSlug);
        }

        // Sắp xếp
        if (sortOrder === "ascending") {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortOrder === "descending") {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }

        setProductsData(filtered);
        setVisibleProducts(filtered.slice(0, itemsPerPage)); // Hiển thị 20 sản phẩm đầu tiên
    }, [
        products,
        searchValue,
        minPrice,
        maxPrice,
        selectedPriceRanges,
        selectedSlug,
        sortOrder,
    ]);

    const handlePriceRangeCheck = (range) => {
        setSelectedPriceRanges([range]); // Chỉ cho phép chọn một khoảng giá
        setTempMinPrice(range.min.toString());
        setTempMaxPrice(range.max === Infinity ? "" : range.max.toString());
        setMinPrice(range.min.toString());
        setMaxPrice(range.max === Infinity ? "" : range.max.toString());
    };

    const resetFilters = () => {
        setSearchValue("");
        setMinPrice("");
        setMaxPrice("");
        setTempMinPrice("");
        setTempMaxPrice("");
        setSelectedPriceRanges([]);
        setSelectedSlug(""); // Reset slug
        setSortOrder("none");
    };

    const applyCustomPriceRange = () => {
        if (tempMinPrice && tempMaxPrice) {
            setMinPrice(tempMinPrice);
            setMaxPrice(tempMaxPrice);
            setSelectedPriceRanges([]);
        }
    };

    const handleSlugChange = (slug) => {
        setSelectedSlug(slug); // Cập nhật slug được chọn
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const loadMoreProducts = () => {
        const currentLength = visibleProducts.length;
        const nextProducts = productsData.slice(
            currentLength,
            currentLength + itemsPerPage
        );
        setVisibleProducts((prev) => [...prev, ...nextProducts]);
    };

    return (
        <Helmet title="Cửa hàng">
            <section>
                <Container>
                    <Row>
                        <Col lg="3">
                            <div className="shop__sidebar">
                                <div className="filter__header">
                                    <h3>Bộ lọc</h3>
                                    <button className="reset__button" onClick={resetFilters}>
                                        Thiết lập lại
                                    </button>
                                </div>
                                <div className="filter__widget">
                                    <h4>Tìm kiếm</h4>
                                    <div className="search__box">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                        <span><i className="ri-search-line"></i></span>
                                    </div>
                                </div>

                                <div className="filter__widget">
                                    <h4>Khoảng giá</h4>
                                    <div className="price__range">
                                        <input
                                            type="number"
                                            placeholder="Giá thấp nhất"
                                            value={tempMinPrice}
                                            onChange={(e) =>
                                                setTempMinPrice(e.target.value)
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Giá cao nhất"
                                            value={tempMaxPrice}
                                            onChange={(e) =>
                                                setTempMaxPrice(e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={applyCustomPriceRange}
                                            disabled={!tempMinPrice || !tempMaxPrice}
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>

                                <div className="filter__widget">
                                    <div className="filter__checkbox">
                                        {priceRanges.map((range) => (
                                            <label key={range.label}>
                                                <input
                                                    type="radio"
                                                    name="priceRange"
                                                    checked={selectedPriceRanges.some(
                                                        (r) =>
                                                            r.min === range.min &&
                                                            r.max === range.max
                                                    )}
                                                    onChange={() =>
                                                        handlePriceRangeCheck(range)
                                                    }
                                                />
                                                {range.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter__widget">
                                    <h4>Phân loại</h4>
                                    <div className="filter__radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="slug"
                                                value=""
                                                checked={selectedSlug === ""}
                                                onChange={() => handleSlugChange("")}
                                            />
                                            Tất cả
                                        </label>
                                        {products.data &&
                                            [
                                                ...new Set(
                                                    products.data.map((p) => p.slug)
                                                ),
                                            ].map((slug, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="radio"
                                                        name="slug"
                                                        value={slug}
                                                        checked={selectedSlug === slug}
                                                        onChange={() =>
                                                            handleSlugChange(slug)
                                                        }
                                                    />
                                                    {slugToVietnamese[slug] || slug}{" "}
                                                    {/* Hiển thị tên tiếng Việt */}
                                                </label>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg="9">
                            <div className="sticky-controls">
                                <div className="sort__controls">
                                    <button
                                        className={`sort__button ${sortOrder === "ascending" ? "active" : ""
                                            }`}
                                        onClick={() => setSortOrder("ascending")}
                                    >
                                        Giá tăng dần
                                    </button>
                                    <button
                                        className={`sort__button ${sortOrder === "descending" ? "active" : ""
                                            }`}
                                        onClick={() => setSortOrder("descending")}
                                    >
                                        Giá giảm dần
                                    </button>
                                </div>
                            </div>

                            {visibleProducts.length === 0 ? (
                                <h1 className="text-center fs-4">
                                    Hiện tại không có sản phẩm nào!
                                </h1>
                            ) : (
                                <ProductsList data={visibleProducts} />
                            )}

                            {visibleProducts.length < productsData.length && (
                                <div style={{ textAlign: "center", marginTop: "20px" }}>
                                    <button
                                        className="load-more-button"
                                        onClick={loadMoreProducts}
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>

            <button
                className={`scroll-to-top ${showScrollButton ? "visible" : ""}`}
                onClick={scrollToTop}
            >
                <i className="ri-arrow-up-line"></i>
            </button>
        </Helmet>
    );
};

export default Shop;