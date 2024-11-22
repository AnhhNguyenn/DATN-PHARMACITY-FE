import React, { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsToShopApi } from "../../redux/slices/productSlice";
import "../styles/shop.css";
import { UserContext } from "../contexts/UserContext";
import { Pagination } from "antd";

const Shop = () => {
    const dispatch = useDispatch();
    const { products} = useSelector((state) => state.product);
    const categories = useSelector((state) => state.category.categories || []);
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [tempMinPrice, setTempMinPrice] = useState("");
    const [tempMaxPrice, setTempMaxPrice] = useState("");
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("none");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const itemsPerPage = 20;

    const priceRanges = [
        { label: "Dưới 100.000 đ", min: 0, max: 100000 },
        { label: "100.000 đ - 300.000 đ", min: 100000, max: 300000 },
        { label: "300.000 đ - 500.000 đ", min: 300000, max: 500000 },
        { label: "Trên 500.000 đ", min: 500000, max: Infinity }
    ];

    useEffect(() => {
        dispatch(getAllProductsToShopApi({ pageNumber: currentPage, pageSize: itemsPerPage }));
    }, [currentPage, dispatch]);


    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let filtered = products.data || [];

        // Filter by search
        if (searchValue) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Filter by custom price range
        if (minPrice && maxPrice) {
            filtered = filtered.filter(item =>
                item.price >= Number(minPrice) && item.price <= Number(maxPrice)
            );
        }

        // Filter by checkbox price ranges
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(item =>
                selectedPriceRanges.some(range =>
                    item.price >= range.min && item.price <= range.max
                )
            );
        }

        // Filter by category
        if (selectedCategory && selectedCategory !== "all") {
            filtered = filtered.filter(item => item.categorySlug === selectedCategory);
        }

        // Sort
        if (sortOrder === "ascending") {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortOrder === "descending") {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }

        setProductsData(filtered);
    }, [products, searchValue, minPrice, maxPrice, selectedPriceRanges, selectedCategory, sortOrder]);

    const handlePriceRangeCheck = (range) => {
        setSelectedPriceRanges([range]); // Chỉ cho phép chọn một khoảng giá
        setTempMinPrice(range.min.toString());
        setTempMaxPrice(range.max === Infinity ? '' : range.max.toString());
        setMinPrice(range.min.toString());
        setMaxPrice(range.max === Infinity ? '' : range.max.toString());
    };

    const resetFilters = () => {
        setSearchValue("");
        setMinPrice("");
        setMaxPrice("");
        setTempMinPrice("");
        setTempMaxPrice("");
        setSelectedPriceRanges([]);
        setSelectedCategory("all");
        setSortOrder("none");
    };

    const handleCategoryChange = (categorySlug) => {
        setSelectedCategory(categorySlug);
    };

    const applyCustomPriceRange = () => {
        if (tempMinPrice && tempMaxPrice) {
            setMinPrice(tempMinPrice);
            setMaxPrice(tempMaxPrice);
            setSelectedPriceRanges([]);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Helmet title="Shop">
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
                                            placeholder="Tìm kiếm..."
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
                                            placeholder="Tối thiểu"
                                            value={tempMinPrice}
                                            onChange={(e) => setTempMinPrice(e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Tối đa"
                                            value={tempMaxPrice}
                                            onChange={(e) => setTempMaxPrice(e.target.value)}
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
                                                    checked={selectedPriceRanges.some(r =>
                                                        r.min === range.min && r.max === range.max
                                                    )}
                                                    onChange={() => handlePriceRangeCheck(range)}
                                                />
                                                {range.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter__widget">
                                    <h4>Danh mục</h4>
                                    <div className="filter__radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="category"
                                                value="all"
                                                checked={selectedCategory === "all"}
                                                onChange={() => handleCategoryChange("all")}
                                            />
                                            Tất cả
                                        </label>
                                        {categories.map((category) => (
                                            <label key={category.id}>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category.slug}
                                                    checked={selectedCategory === category.slug}
                                                    onChange={() => handleCategoryChange(category.slug)}
                                                />
                                                {category.name}
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
                                        className={`sort__button ${sortOrder === "ascending" ? "active" : ""}`}
                                        onClick={() => setSortOrder("ascending")}
                                    >
                                        Giá tăng dần
                                    </button>
                                    <button
                                        className={`sort__button ${sortOrder === "descending" ? "active" : ""}`}
                                        onClick={() => setSortOrder("descending")}
                                    >
                                        Giá giảm dần
                                    </button>
                                </div>
                            </div>

                            {productsData.length === 0 ? (
                                <h1 className="text-center fs-4">
                                    Hiện tại không có sản phẩm nào!
                                </h1>
                            ) : (
                                <ProductsList data={productsData} />
                            )}

                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={products.pagination?.totalRecords || 0}
                                    onChange={(page) => setCurrentPage(page)}
                                    showSizeChanger={false}
                                    hideOnSinglePage={true}
                                    responsive={true}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <button
                className={`scroll-to-top ${showScrollButton ? 'visible' : ''}`}
                onClick={scrollToTop}
            >
                <i className="ri-arrow-up-line"></i>
            </button>
        </Helmet>
    );
};

export default Shop;