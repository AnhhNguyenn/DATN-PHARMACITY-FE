import { Modal, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordService } from "../../../services/userService";
import "./changePassword.css";

const ChangePassword = (props) => {
    const [data, setData] = useState({});
    const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const token = JSON.parse(localStorage.getItem("token"));

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setData({ ...data, [name]: value });
    };

    const handleOk = () => {
        if (data.newPassword?.localeCompare(data.pass_confirm) === 0) {
            const handle = async () => {
                const _data = {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    idUser: user.id
                };
                const result = await changePasswordService(_data, token);
                const _result = result.data;
                if (_result.status === 200) {
                    toast.success(_result.message);
                    props.onOpen();
                } else {
                    toast.error(_result.message);
                }
            };
            handle();
        } else {
            toast.error("Xác nhận mật khẩu không đúng, vui lòng nhập lại!");
        }
    };

    return (
        <Modal
            title="Đổi mật khẩu"
            open={props.open}
            onCancel={() => props.onOpen()}
            className="change-pwd-modal"
            footer={
                <div className="modal-footer">
                    <button className="btn-submit" onClick={handleOk}>
                        Hoàn thành
                    </button>
                </div>
            }
            width={400}
            centered
        >
            <div className="change-pwd-content">
                <p className="change-pwd-notice">
                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                    <br />
                    Bạn có thể tạo mật khẩu từ 8 - 16 kí tự
                </p>
                <Input.Password
                    name="oldPassword"
                    placeholder="Mật khẩu hiện tại"
                    className="change-pwd-input"
                    onChange={handleChange}
                />
                <Input.Password
                    name="newPassword"
                    placeholder="Mật khẩu mới"
                    className="change-pwd-input"
                    onChange={handleChange}
                />
                <Input.Password
                    name="pass_confirm"
                    placeholder="Nhập lại mật khẩu"
                    className="change-pwd-input"
                    onChange={handleChange}
                />
            </div>
        </Modal>
    );
};

export default ChangePassword;