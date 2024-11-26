import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "antd";

export default function FormWarehouse(props) {
  const { initialData, submitForm } = props;

  const formik = useFormik({
    initialValues: {
      name: initialData.name || "", // Tên kho
      address: initialData.address || "", // Địa chỉ kho
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên kho không được để trống!"),
      address: Yup.string().nullable(), // Địa chỉ có thể null
    }),

    onSubmit: async (values) => {
      submitForm(values); // Gửi dữ liệu qua hàm submitForm
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <div className="container mt-5" style={{ padding: "0px 60px" }}>
      <form onSubmit={handleSubmit}>
        {/* Tên kho */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="name">
            Tên kho
          </h5>
          <Input
            onChange={handleChange}
            type="text"
            name="name"
            value={values.name}
            placeholder="Nhập tên kho"
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
