import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <>
            <div className="blue-bar"></div>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md="3">
                            <div className="footer__section">
                                <h3 className="footer__title">Về Pharmacity</h3>
                                <Link to="#" className="footer__link">Giới thiệu</Link>
                                <Link to="#" className="footer__link">Hệ thống của hàng</Link>
                                <Link to="#" className="footer__link">Giấy phép kinh doanh</Link>
                                <Link to="#" className="footer__link">Quy chế hoạt động</Link>
                                <Link to="#" className="footer__link">Chính sách đổi trả</Link>
                                <Link to="#" className="footer__link">Chính sách giao hàng</Link>
                                <Link to="#" className="footer__link">Chính sách bảo mật</Link>
                            </div>
                        </Col>

                        <Col md="3">
                            <div className="footer__section">
                                <h3 className="footer__title">Danh mục</h3>
                                <Link to="#" className="footer__link">Thuốc</Link>
                                <Link to="#" className="footer__link">Tra cứu bệnh</Link>
                                <Link to="#" className="footer__link">Thực phẩm chức năng</Link>
                                <Link to="#" className="footer__link">Chăm sóc cá nhân</Link>
                                <Link to="#" className="footer__link">Mẹ và Bé</Link>
                                <Link to="#" className="footer__link">Thiết bị y tế</Link>
                            </div>
                        </Col>

                        <Col md="3">
                            <div className="footer__section">
                                <h3 className="footer__title">Tổng đài CSKH</h3>
                                <div className="footer__contact-info">
                                    Hỗ trợ đặt hàng<br />
                                    <a href="tel:18006821" style={{ textDecoration: 'none' }}>
                                        <strong>1800 6821</strong>
                                    </a>
                                </div>

                                <div className="footer__language">
                                    <i className="ri-global-line"></i>
                                    Language
                                </div>
                            </div>
                        </Col>

                        <Col md="3">
                            <div className="footer__section">
                                <h3 className="footer__title">Theo dõi chúng tôi trên</h3>
                                <div className="footer__social">
                                    <a
                                        href="https://www.facebook.com/PharmacityVN"
                                        className="footer__link"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <img
                                            className="footer__social-icon"
                                            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163158-0-facebook.svg"
                                            alt="facebook logo"
                                            loading="lazy"
                                            width="24"
                                            height="24"
                                        />
                                        Facebook
                                    </a>
                                    <a
                                        href="https://www.youtube.com/channel/UC34rPqjyb_WCq6dMu2khYQA"
                                        className="footer__link"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <img
                                            className="footer__social-icon"
                                            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163159-0-youtube.svg"
                                            alt="youtube logo"
                                            loading="lazy"
                                            width="24"
                                            height="24"
                                        />
                                        Youtube
                                    </a>
                                    <a
                                        href="https://zalo.me/1123198001548302988?src=qr"
                                        className="footer__link"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <img
                                            className="footer__social-icon"
                                            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706163159-0-zalo.svg"
                                            alt="zalo logo"
                                            loading="lazy"
                                            width="24"
                                            height="24"
                                        />
                                        Zalo
                                    </a>
                                </div>

                                <h3 className="footer__title mt-4">Tải ứng dụng Pharmacity ngay tức thời</h3>
                                <div className="footer__download">
                                    <div>
                                        <img
                                            src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706154633-0-qr-code.png"
                                            alt="QR Code"
                                            className="footer__qr"
                                        />
                                        <p className="qr-text">Quét mã để tải ứng dụng</p>
                                    </div>

                                    <span className="hoac-text">Hoặc</span>

                                    <div className="footer__app-stores">
                                        <a
                                            rel="noopener noreferrer"
                                            className="store-button-container"
                                            target="_blank"
                                            href="https://apps.apple.com/us/app/pharmacity-nha%CC%80-thu%E1%BB%91c-ti%E1%BB%87n-l%E1%BB%A3i/id1414835869"
                                        >
                                            <img
                                                src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706154633-0-app-store.png"
                                                alt="Apple store"
                                                className="footer__store-button"
                                            />
                                        </a>
                                        <a
                                            rel="noopener noreferrer"
                                            className="store-button-container"
                                            target="_blank"
                                            href="https://play.google.com/store/apps/details?id=com.pharmacity_extracare"
                                        >
                                            <img
                                                src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706154633-0-google-play.png"
                                                alt="Google play"
                                                className="footer__store-button"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="d-flex justify-content-end">
                            <div className="footer__payment">
                                <h4 className="text-[14px] leading-[20px] mb-4 font-bold">Hỗ trợ thanh toán</h4>
                                <div className="grid grid-cols-6 gap-2 sm:gap-4">
                                    <div>
                                        <img src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706162440-0-COD.png" alt="COD" loading="lazy" width="500" height="500" />
                                    </div>
                                    <div>
                                        <img src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706162441-0-Visa.png" alt="Visa" loading="lazy" width="500" height="500" />
                                    </div>
                                    <div>
                                        <img src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706162441-0-MasterCard.png" alt="MasterCard" loading="lazy" width="500" height="500" />
                                    </div>
                                    <div>
                                        <img src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706162441-0-JCB.png" alt="JCB" loading="lazy" width="500" height="500" />
                                    </div>
                                    <div>
                                        <img src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706162441-0-Momo.png" alt="Momo" loading="lazy" width="500" height="500" />
                                    </div>
                                    <div>
                                        <img src="https://prod-cdn.pharmacity.io/e-com/images/static-website/20240706162729-0-ZaloPay.png" alt="ZaloPay" loading="lazy" width="500" height="500" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="footer__bottom">
                        <div className="footer__bottom-left">
                            <p>Công Ty Cổ Phần Dược Phẩm Pharmacity</p>
                            <p>Trụ sở: 248A Nơ Trang Long, P.12, Q.Bình Thạnh, TP.Hồ Chí Minh</p>
                            <p>Điện thoại: 1800 6821 - Email: cskh@pharmacity.vn</p>
                        </div>
                        <div className="footer__bottom-right">
                            <p>GCNĐKKD: 0311770883 do sở KH & ĐT TP.HCM cấp lần đầu ngày 05/05/2012.</p>
                            <p>GCNĐKKDD: 6782/ĐKKDDD-ĐNai ngày cấp 26/4/2022 Sở Y Tế Tỉnh Đồng Nai.</p>
                        </div>
                    </div>
                </Container>
            </footer>
        </>
    );
};

export default Footer;