import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, FormGroup } from "reactstrap";
import * as Yup from "yup";
import { userLoginApi } from "../../redux/slices/userSlice";
import "../styles/login.css";

const Login = ({ onClose, setShowSignup, setShowLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = undefined;
        formik.values.email && formik.values.password
            ? formik.errors.email || formik.errors.password
                ? toast.error("Email hoặc passworld không hợp lệ!")
                : (data = formik.values)
            : toast.error("Email hoặc passworld không hợp lệ!");

        const fectLoginApi = async () => {
            const respon = await dispatch(userLoginApi(data));
            if (respon.payload.status !== 200) {
                toast.error(
                    "Đăng nhập thất bại! Vui lòng kiểm tra email hoặc mật khẩu."
                );
            } else {
                localStorage.setItem(
                    "user",
                    JSON.stringify(respon.payload.data[0])
                );
                navigate("/home");
                toast.success("Đăng nhập thành công!");
                onClose();
                window.location.reload(true);
            }
        };

        if (data !== undefined) fectLoginApi();
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
                    <button type="button" className="login__google">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        Tiếp tục với Google
                    </button>
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