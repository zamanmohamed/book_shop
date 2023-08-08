import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAdminetails } from "../actions/adminAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

const ViewSingleAuthorScreen = () => {
  const id = useParams().id;
  const history = useNavigate();

  const productDetail = useSelector((state) => state.adminDetails);
  const { loading, error, admin } = productDetail;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAdminetails(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    history(`/admin/${id}/edit`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src="/images/user.png" alt={admin.first_name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{`${admin.first_name} ${admin.last_name}`}</h3>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                  >
                    Update Author
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ViewSingleAuthorScreen;
