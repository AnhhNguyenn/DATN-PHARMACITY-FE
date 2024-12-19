import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLoginApi, userSignupApi } from "../../redux/slices/userSlice";
import "../styles/signup.css";
import { Eye, EyeOff } from 'lucide-react';

const Signup = ({ onClose, setShowSignup, setShowLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            confirmedPassword: "",
            address: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required")
                .min(4, "Phải có 4 ký tự trở lên"),
            address: Yup.string()
                .required("Required")
                .min(4, "Phải có 4 ký tự trở lên"),
            email: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Vui lòng nhập địa chỉ email hợp lệ"
                ),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt"
                ),
            confirmedPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
            phone: Yup.string()
                .required("Required")
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    "Phải là một số điện thoại hợp lệ"
                ),
        }),
        onSubmit: async (values) => {
            const dataSignup = { ...values };
            delete dataSignup.confirmedPassword;

            try {
                const response = await dispatch(userSignupApi(dataSignup));
                if (response.payload.status === 200) {
                    const dataLogin = {
                        email: values.email,
                        password: values.password,
                    };
                    await dispatch(userLoginApi(dataLogin));
                    toast.success("Đăng ký thành công!");
                    onClose();
                    navigate("/home");
                } else {
                    toast.error("Đăng ký thất bại!");
                }
            } catch (error) {
                toast.error("Đã có lỗi xảy ra!");
            }
        },
    });

    const handleShowLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };


    return (
        <div className="signup">
            <div className="signup__overlay" onClick={onClose}></div>
            <div className="signup__content">
                <button className="signup__close" onClick={onClose}>×</button>
                <h3 className="signup__title">ĐĂNG KÝ TÀI KHOẢN</h3>
                <p className="signup__subtitle">Vui lòng nhập thông tin bên dưới để tạo tài khoản</p>

                <Form className="signup__form" onSubmit={formik.handleSubmit}>
                    <FormGroup className="form__group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập tên của bạn"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <p className="errorMsg">{formik.errors.name}</p>
                        )}
                    </FormGroup>

                    <FormGroup className="form__group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email của bạn"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className="errorMsg">{formik.errors.email}</p>
                        )}
                    </FormGroup>

                    <FormGroup className="form__group password-input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <span className="password-toggle-icon" onClick={handleTogglePassword}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </span>
                        {formik.errors.password && formik.touched.password && (
                            <p className="errorMsg">{formik.errors.password}</p>
                        )}
                    </FormGroup>
                    <FormGroup className="form__group password-input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmedPassword"
                            placeholder="Xác nhận mật khẩu của bạn"
                            value={formik.values.confirmedPassword}
                            onChange={formik.handleChange}
                        />
                        <span className="password-toggle-icon" onClick={handleToggleConfirmPassword}>
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </span>
                        {formik.errors.confirmedPassword && formik.touched.confirmedPassword && (
                            <p className="errorMsg">{formik.errors.confirmedPassword}</p>
                        )}
                    </FormGroup>

                    <FormGroup className="form__group">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Nhập số điện thoại của bạn"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <p className="errorMsg">{formik.errors.phone}</p>
                        )}
                    </FormGroup>

                    <FormGroup className="form__group">
                        <input
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ của bạn"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.address && formik.touched.address && (
                            <p className="errorMsg">{formik.errors.address}</p>
                        )}
                    </FormGroup>

                    <button
                        type="submit"
                        className={`signup__submit ${Object.keys(formik.errors).length === 0 &&
                            Object.keys(formik.touched).length > 0
                            ? 'active'
                            : ''
                            }`}
                    >
                        Đăng ký
                    </button>

                    <div className="signup__login">
                        <span>Đã có tài khoản? </span>
                        <button
                            onClick={handleShowLogin}
                            className="login-link"
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
                            Đăng nhập
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;