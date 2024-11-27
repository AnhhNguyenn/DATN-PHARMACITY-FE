import React, { useRef, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editProfileApi } from "../../../redux/slices/userSlice";
import icon from "../../../assets/images/user-icon.png";
import ChangePassword from "./ChangePassword";


export const GeneralInfoForm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const imgReview = useRef(null);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(user?.pathImg);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onOpen = () => {
        setOpen(!open);
    };

    const showImgProduct = (fileToLoad) => {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadEvent) {
            let srcData = fileLoadEvent.target.result;
            imgReview.current.src = srcData;
            imgReview.current.style.display = "block";
        };
        fileReader.readAsDataURL(fileToLoad);
    };

    const handleUpImage = async (e) => {
        showImgProduct(e.target.files[0]);
        let imgArr = [];
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "kpmcyaxr");
        formData.append("cloud_name", "df6mryfkp");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/df6mryfkp/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await res.json();
            imgArr.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            setImage(imgArr[0].url);
        } catch (error) {
            toast.error("Upload ảnh thất bại!");
        }
    };

    const maskPhoneNumber = (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 *** $3');
    };

    const formik = useFormik({
        initialValues: {
            id: user.id,
            password: user.password,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            idRole: user.idRole,
            pathImg: user.pathImg,
        },
        onSubmit: async (values) => {
            const _image = image || values.pathImg;
            const data = { ...values, pathImg: _image };

            try {
                const response = await dispatch(editProfileApi(data));
                if (response.payload.data.status === 200) {
                    // Cập nhật localStorage với thông tin mới
                    const updatedUser = {
                        ...user,
                        name: values.name,
                        email: values.email,
                        address: values.address,
                        pathImg: _image
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    toast.success("Sửa thông tin thành công!");
                    navigate("/profile");
                } else {
                    toast.error("Sửa thông tin thất bại!");
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra!");
            }
        },
    });


    const { values, handleChange, handleSubmit } = formik;

    return (
        <div className="profile-container">
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">Thông tin cá nhân</h5>

                    {/* Avatar Section */}
                    <div className="profile-image-section">
                        <Card.Img
                            src={image || icon}
                            alt="Avatar"
                            ref={imgReview}
                            className="user-avatar rounded-circle"
                        />
                        <div className="upload-info">
                            <Form.Group id="image">
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .png"
                                    onChange={handleUpImage}
                                    hidden
                                    id="upload"
                                />
                                <label htmlFor="upload" className="update-avatar-btn">
                                    Cập nhật ảnh mới
                                </label>
                                <div className="file-requirements">
                                    Dung lượng file tối đa 5 MB.
                                    <br />
                                    Định dạng: .JPEG, .PNG
                                </div>
                            </Form.Group>
                        </div>
                    </div>

                    {/* Form Section */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                value={maskPhoneNumber(values.phone)}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="profile-buttons">
                            <Button variant="secondary" onClick={onOpen}>
                                Thay đổi mật khẩu
                            </Button>
                            <Button variant="primary" type="submit">
                                Lưu
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            {open && <ChangePassword open={open} onOpen={onOpen} />}
        </div>
    );
};