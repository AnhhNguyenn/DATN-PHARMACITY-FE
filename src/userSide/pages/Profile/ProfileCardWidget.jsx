import React, { useRef, useState } from "react";
import { Col, Row, Card } from "@themesberg/react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatarApi } from "../../../redux/slices/userSlice";
import icon from "../../../assets/images/user-icon.png";
export const ProfileCardWidget = () => {
    const userLogin = JSON.parse(localStorage.getItem("currentUser"));
    const imgReview = useRef(null);
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState();

    const showImgProduct = (fileToLoad) => {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadEvent) {
            let srcData = fileLoadEvent.target.result;
            imgReview.current.src = srcData;
        };

        // Đọc thông tin tập tin đã được đăng tải
        fileReader.readAsDataURL(fileToLoad);
    };

    const cancelAvatar = (e) => {
        e.preventDefault();
        imgReview.current.src = userLogin.data.pathImg;
        setAvatar("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("avatar", avatar);

        try {
            const response = await dispatch(uploadAvatarApi(userLogin.id, formData));
            if (response.payload.data.status === 200) {
                // Cập nhật localStorage với avatar mới
                const updatedUser = {
                    ...userLogin,
                    data: {
                        ...userLogin.data,
                        pathImg: response.payload.data.pathImg,
                    }
                };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                toast.success("Avatar saved successfully!");
                setAvatar("");
            }
        } catch (error) {
            toast.error("Upload avatar failed!");
        }
    };

    const styleRef = {
        label: {
            display: avatar ? "none" : "block",
        },
        button: {
            display: avatar ? "block" : "none",
        },
    };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Ảnh đại diện</h5>
                <div className="profile-image-section">
                    <Card.Img
                        src={userLogin.data.pathImg ? userLogin.data.pathImg : icon}
                        alt="Avatar"
                        ref={imgReview}
                        className="user-avatar rounded-circle"
                    />
                    <form className="form__upload" onSubmit={handleSubmit}>
                        <input
                            type="file"
                            id="upload"
                            accept=".jpg, .png"
                            hidden
                            name="avatar"
                            onChange={(event) => {
                                const fileLoad = event.currentTarget.files[0];
                                showImgProduct(fileLoad);
                                setAvatar(fileLoad);
                            }}
                        />
                        <div className="upload-info">
                            <label
                                className="update-avatar-btn"
                                htmlFor="upload"
                                style={styleRef.label}
                            >
                                Cập nhật ảnh mới
                            </label>
                            <div className="file-requirements">
                                Dung lượng file tối đa 5 MB.
                                <br />
                                Định dạng: .JPEG, .PNG
                            </div>
                        </div>

                        <div className="container__button" style={styleRef.button}>
                            <button
                                className="btn btn-secondary"
                                onClick={cancelAvatar}
                            >
                                Hủy
                            </button>
                            <button type="submit" className="btn btn-success ml-2">
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </Card.Body>
        </Card>
    );
};

export const CardWidget = (props) => {
    const { title, value } = props;

    return (
        <Card border="light" className="shadow-sm">
            <Card.Body>
                <Row className="d-block d-flex align-items-center text-center">
                    <Col xs={12} xl={12} className="px-xl-0">
                        <div className="d-none d-sm-block">
                            <h5>{title}</h5>
                            <h3 className="mb-1">{value}</h3>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
