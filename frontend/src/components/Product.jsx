import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="m-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src="/images/sample.jpg" variant="top"></Card.Img>
      </Link>
      <Link to={`/product/${product._id}`}>
        <Card.Title as="h6">
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>

      <Card.Text>ISBN: {product.isbn}</Card.Text>
    </Card>
  );
};

export default Product;
