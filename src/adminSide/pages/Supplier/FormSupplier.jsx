import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "antd";

export default function FormSupplier(props) {
  const { initialData, submitForm } = props;

  const formik = useFormik({
    initialValues: {
      name: initialData.name || "",
      address: initialData.address || "",
      phone: initialData.phone || "",
      email: initialData.email || "",
      createAt: initialData.createAt
        ? new Date(initialData.createAt).toISOString().split("T")[0]
        : "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên nhà cung cấp không được để trống!"),
      address: Yup.string().required("Địa chỉ không được để trống!"),
      phone: Yup.string()
        .required("Số điện thoại không được để trống!")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ!"),
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Email không được để trống!"),
      createAt: Yup.date().required("Ngày tạo không được để trống!"),
    }),

    onSubmit: async (values) => {
      submitForm(values);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <div className="container mt-5" style={{ padding: "0px 60px" }}>
      <form onSubmit={handleSubmit}>
        {/* Tên nhà cung cấp */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="name">
            Tên nhà cung cấp
          </h5>
          <Input
            onChange={handleChange}
            type="text"
            name="name"
            value={values.name}
            placeholder="Nhập tên nhà cung cấp"
          />
          <span className="text-danger">{errors.name}</span>
        </div>

        {/* Địa chỉ */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="address">
            Địa chỉ
          </h5>
          <Input
            onChange={handleChange}
            type="text"
            name="address"
            value={values.address}
            placeholder="Nhập địa chỉ"
          />
          <span className="text-danger">{errors.address}</span>
        </div>

        {/* Số điện thoại */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="phone">
            Số điện thoại
          </h5>
          <Input
            onChange={handleChange}
            type="text"
            name="phone"
            value={values.phone}
            placeholder="Nhập số điện thoại"
          />
          <span className="text-danger">{errors.phone}</span>
        </div>

        {/* Email */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="email">
            Email
          </h5>
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            value={values.email}
            placeholder="Nhập email"
          />
          <span className="text-danger">{errors.email}</span>
        </div>

        {/* Ngày tạo */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="createAt">
            Ngày tạo
          </h5>
          <Input
            onChange={handleChange}
            type="date"
            name="createAt"
            value={values.createAt}
          />
          <span className="text-danger">{errors.createAt}</span>
        </div>

        {/* Nút Lưu */}
        <Button
          type="primary"
          block
          htmlType="submit"
          style={{ fontSize: "16px" }}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}
