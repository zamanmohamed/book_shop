import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateAdmin, listAdminetails } from "../actions/adminAction";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const AuthorEditScreen = () => {
  const adminId = useParams().id;
  const history = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.adminDetails);
  const { loading, error, admin } = productDetails;

  const productUpdate = useSelector((state) => state.adminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (admin._id !== adminId) {
      dispatch(listAdminetails(adminId));
    } else {
      setfirstName(admin.first_name);
      setLastName(admin.last_name);
    }
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAdmin({
        first_name: firstName,
        last_name: lastName,
        _id: adminId,
      })
    );
    history("/author");
    window.location.reload(false);
  };

  const isFormValid = firstName && lastName;

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Author</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-5"
              disabled={!isFormValid}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AuthorEditScreen;
