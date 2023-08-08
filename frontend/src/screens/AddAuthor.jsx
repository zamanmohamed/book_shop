import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { createAdmin } from "../actions/adminAction";

const AddAuthor = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const productDetails = useSelector((state) => state.adminCreate);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (loading) {
      history("/author");
      window.location.reload(false);
    }
  }, [loading]);

  const submitHandler = () => {
    dispatch(
      createAdmin({
        first_name: firstName,
        last_name: lastName,
      })
    );
  };
  const isFormValid = firstName && lastName;

  return (
    <>
      <>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Add Author</h1>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
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
                Add
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    </>
  );
};

export default AddAuthor;
