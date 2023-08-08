import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAdmins } from "../actions/adminAction";
import Admin from "../components/admin";

const AuthorScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.adminList);
  const { loading, error, admins } = productList;

  useEffect(() => {
    dispatch(listAdmins());
  }, [dispatch]);

  return (
    <>
      <h1>Author List</h1>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {admins.map((admin) => (
            <Col key={admin._id} sm={12} md={6} lg={4} xl={3}>
              <Admin admin={admin} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AuthorScreen;
