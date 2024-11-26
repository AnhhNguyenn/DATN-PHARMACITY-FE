import React from "react";
import ProductCard from "./ProductCard";
import { Row } from "reactstrap";

const ProductsList = (props) => {
  const { data } = props;
  return (
    <Row>
      {data.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </Row>
  );
};

export default ProductsList;