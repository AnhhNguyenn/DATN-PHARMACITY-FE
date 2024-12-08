import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, FormGroup } from "reactstrap";
import * as Yup from "yup";
import { userLoginApi } from "../../redux/slices/userSlice";
import "../styles/login.css";
// import { useGoogleLogin } from '@react-oauth/google';
// import { signupServices } from "../../services/signupService";
// import { editProfileApi } from "../../redux/slices/userSlice";
// import { useEffect } from 'react';

const Login = ({ onClose, setShowSignup, setShowLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleGoogleLogin = useGoogleLogin({
    //     onSuccess: async (response) => {
    //         try {
    //             const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    //                 headers: {
    //                     Authorization: `Bearer ${response.access_token}`,
    //                 },
    //             }).then(res => res.json());

    //             // Tạo dữ liệu đăng nhập từ email Google
    //             const loginData = {
    //                 email: userInfo.email,
    //                 password: "Google@" + userInfo.email
    //             };

    //             // Thử đăng nhập trước
    //             const loginResponse = await dispatch(userLoginApi(loginData));

    //             if (loginResponse.payload.status === 200) {
    //                 // Nếu đăng nhập thành công, cập nhật ảnh đại diện
    //                 const userData = loginResponse.payload.data;
    //                 // Cập nhật ảnh đại diện nếu chưa có
    //                 if (userData) {
    //                     if (!userData.pathImg) {
    //                         const updateData = {
    //                             ...userData,
    //                             pathImg: userInfo.picture // Lấy ảnh từ Google
    //                         };
    //                         const updateResponse = await dispatch(editProfileApi(updateData));
    //                         if (updateResponse.payload.data.status === 200) {
    //                             localStorage.setItem('user', JSON.stringify(updateData));
    //                         }
    //                     } else {
    //                         localStorage.setItem('user', JSON.stringify(userData));
    //                     }
    //                 }
    //                 else {
    //                     console.error("Backend did not return user data.");
    //                     toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
    //                 }
    //                 toast.success('Đăng nhập Google thành công!');
    //                 onClose();
    //                 navigate('/home');
    //                 window.location.reload();
    //             } else {
    //                 // Nếu đăng nhập thất bại, thực hiện đăng ký
    //                 const signupData = {
    //                     email: userInfo.email,
    //                     name: userInfo.name,
    //                     password: loginData.password,
    //                     phone: "0000000000",
    //                     address: "Chưa cập nhật",
    //                     pathImg: userInfo.picture // Thêm ảnh đại diện khi đăng ký
    //                 };

    //                 const signupResponse = await signupServices(signupData);

    //                 if (signupResponse.status === 200) {
    //                     const newLoginResponse = await dispatch(userLoginApi(loginData));

    //                     if (newLoginResponse.payload.status === 200) {
    //                         localStorage.setItem('user', JSON.stringify({
    //                             ...newLoginResponse.payload.data[0],
    //                             pathImg: userInfo.picture
    //                         }));
    //                         toast.success('Đăng ký và đăng nhập Google thành công!');
    //                         onClose();
    //                         navigate('/home');
    //                         window.location.reload();
    //                     } else {
    //                         toast.error('Đăng nhập thất bại sau khi đăng ký!');
    //                     }
    //                 } else {
    //                     toast.error('Đăng ký tài khoản thất bại!');
    //                 }
    //             }
    //         } catch (error) {
    //             toast.error('Đăng nhập Google thất bại!');
    //             console.error('Error during Google login:', error);
    //         }
    //     },
    //     onError: () => {
    //         toast.error('Đăng nhập Google thất bại!');
    //     }
    // });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required()
                .min(4)
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
            password: Yup.string().required(),
        }),
    });

    const handleShowSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formik.isValid) return;

        try {
            const respon = await dispatch(userLoginApi(formik.values));
            if (respon?.payload?.data?.status !== 200) {
                toast.error(respon.payload.message || "Đăng nhập thất bại! Vui lòng kiểm tra email hoặc mật khẩu.");
            } else {
                const userData = respon.payload.data.data; // Dữ liệu user từ API

                // Kiểm tra role
                if (userData.role) {
                    // Lưu thông tin user vào localStorage
                    localStorage.setItem("user", JSON.stringify(userData));
                    toast.success("Đăng nhập thành công!");
                    onClose();

                    // Điều hướng dựa trên role
                    if (userData.role === 'Admin') {
                        navigate('/admin');
                    } else {
                        navigate('/home');
                    }
                } else {
                    toast.error("Không thể xác định quyền người dùng.");
                }
                window.location.reload();
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="login">
            <div className="login__overlay" onClick={onClose}></div>
            <div className="login__content">
                <button className="login__close" onClick={onClose}>×</button>
                <h3 className="login__title">XIN CHÀO,</h3>
                <p className="login__subtitle">Vui lòng nhập thông tin bên dưới để tiếp tục</p>
                <Form className="login__form" onSubmit={handleSubmit}>
                    <FormGroup className="form__group">
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </FormGroup>
                    <FormGroup className="form__group">
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Nhập mật khẩu của bạn"
                        />
                    </FormGroup>
                    <button
                        type="submit"
                        className={`login__submit ${formik.values.email &&
                            formik.values.password &&
                            !formik.errors.email &&
                            !formik.errors.password ? 'active' : ''
                            }`}
                    >
                        Tiếp tục
                    </button>
                    <div className="login__divider">
                        <span>Hoặc</span>
                    </div>
                    {/* <button
                        type="button"
                        className="login__google"
                        onClick={() => handleGoogleLogin()}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        Tiếp tục với Google
                    </button> */}
                    <div className="login__signup">
                        <span>Chưa có tài khoản? </span>
                        <button
                            onClick={handleShowSignup}
                            className="signup-link"
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#0d6efd',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                fontWeight: 'bold'
                            }}
                        >
                            Đăng ký
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;