import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Switch } from "antd";

export default function FormWarehouse(props) {
  const { initialData, submitForm } = props;

  const formik = useFormik({
    initialValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      discountPercentage: initialData.discountPercentage || 0,
      quantity: initialData.quantity || 0,
      startDate: initialData.startDate || "",
      endDate: initialData.endDate || "",
      isActive: initialData.isActive || true, // Trạng thái kích hoạt mặc định
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Tên khuyến mãi không được để trống!"),
      description: Yup.string().required("Mô tả không được để trống!"),
      discountPercentage: Yup.number()
        .required("Tỷ lệ giảm giá không được để trống!")
        .min(0, "Giảm giá không thể dưới 0%"),
      quantity: Yup.number()
        .required("Số lượng không được để trống!")
        .min(0, "Số lượng phải là số dương"),
      startDate: Yup.date().required("Ngày bắt đầu không được để trống!"),
      endDate: Yup.date().required("Ngày kết thúc không được để trống!"),
    }),

    onSubmit: async (values) => {
      submitForm(values);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <div className="container mt-5" style={{ padding: "0px 60px" }}>
      <form onSubmit={handleSubmit}>
        {/* Tên khuyến mãi */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="name">
            Tên khuyến mãi
          </h5>
          <Input
            onChange={handleChange}
            type="text"
            name="name"
            value={values.name}
            placeholder="Nhập tên khuyến mãi"
          />
          <span className="text-danger">{errors.name}</span>
        </div>

        {/* Mô tả */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="description">
            Mô tả
          </h5>
          <Input
            onChange={handleChange}
            type="text"
            name="description"
            value={values.description}
            placeholder="Nhập mô tả"
          />
          <span className="text-danger">{errors.description}</span>
        </div>

        {/* Tỷ lệ giảm giá */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="discountPercentage">
            Tỷ lệ giảm giá
          </h5>
          <Input
            onChange={handleChange}
            type="number"
            name="discountPercentage"
            value={values.discountPercentage}
            placeholder="Nhập tỷ lệ giảm giá"
          />
          <span className="text-danger">{errors.discountPercentage}</span>
        </div>

        {/* Số lượng */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="quantity">
            Số lượng
          </h5>
          <Input
            onChange={handleChange}
            type="number"
            name="quantity"
            value={values.quantity}
            placeholder="Nhập số lượng"
          />
          <span className="text-danger">{errors.quantity}</span>
        </div>

        {/* Ngày bắt đầu */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="startDate">
            Ngày bắt đầu
          </h5>
          <Input
            onChange={handleChange}
            type="date"
            name="startDate"
            value={values.startDate}
          />
          <span className="text-danger">{errors.startDate}</span>
        </div>

        {/* Ngày kết thúc */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="endDate">
            Ngày kết thúc
          </h5>
          <Input
            onChange={handleChange}
            type="date"
            name="endDate"
            value={values.endDate}
          />
          <span className="text-danger">{errors.endDate}</span>
        </div>

        {/* Trạng thái kích hoạt */}
        <div className="form-group">
          <h5 style={{ marginBottom: "10px" }} htmlFor="isActive">
            Kích hoạt
          </h5>
          <Switch
            onChange={(checked) => formik.setFieldValue("isActive", checked)}
            checked={values.isActive}
          />
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