import React, { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsApi } from "../../redux/slices/productSlice";
import "../styles/shop.css";
import { UserContext } from "../contexts/UserContext";
import { Pagination } from "antd";

const filterProducts = (products, filterValue, sortValue, searchValue) => {
    const filteredProducts =
        filterValue === "all"
            ? products
            : products.filter((item) => item.slug === filterValue);

    const sortedProducts =
        sortValue === "all"
            ? filteredProducts
            : sortValue === "ascending"
                ? [...filteredProducts].sort((a, b) => a.price - b.price)
                : [...filteredProducts].sort((a, b) => b.price - a.price);

    return searchValue
        ? sortedProducts.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        : sortedProducts;
};

const Shop = () => {
    const dispatch = useDispatch();
    const { data } = useContext(UserContext);
    const products = useSelector((state) => state.product.products || []);
    const categories = useSelector((state) => state.category.categories || []);
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValue, setFilterValue] = useState("all");
    const [sortValue, setSortValue] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const itemsPerPage = 12;

    useEffect(() => {
        dispatch(getAllProductsApi({ pageNumber: currentPage, pageSize: itemsPerPage }));
    }, [currentPage, dispatch]);

    useEffect(() => {
        setProductsData(
            filterProducts(products.data || [], filterValue, sortValue, searchValue)
        );
    }, [products, filterValue, sortValue, searchValue]);

    const handleFilter = (e) => {
        setFilterValue(e.target.value);
    };

    const handleSort = (e) => {
        setSortValue(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Helmet title="Shop">
            <CommonSection title="Sản Phẩm" />
            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="all">Lọc theo danh mục</option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.slug}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>
                        <Col lg="3" md="6" className="text-end">
                            <div className="filter__widget">
                                <select onChange={handleSort}>
                                    <option value="all">Sắp xếp theo</option>
                                    <option value="ascending">Tăng dần</option>
                                    <option value="descending">Giảm dần</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="6" md="12">
                            <div className="search__box">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    onChange={handleSearch}
                                />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        {productsData.length === 0 ? (
                            <h1 className="text-center fs-4">
                                Hiện tại không có sản phẩm nào!
                            </h1>
                        ) : (
                            <ProductsList data={productsData} />
                        )}
                    </Row>
                </Container>
            </section>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={products.pagination?.totalRecords || 0}
                    onChange={onPageChange}
                />
            </div>
        </Helmet>
    );
};

export default Shop;
