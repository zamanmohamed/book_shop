import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { createProduct } from "../actions/productActions";

const ProductListScreen = () => {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [authorId, setAutorId] = useState("");
  const [dropdownData, setDropdownData] = useState([]);

  const productDetails = useSelector((state) => state.productCreate);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (loading) {
      history("/");
      window.location.reload(false);
    }
  }, [loading]);

  useEffect(() => {
    const featchAuthors = async () => {
      const { data } = await axios.get("/api/author");
      setDropdownData(data.authors);
      console.log(data.authors, "datadatadafagahah");
    };

    featchAuthors();
  }, []);
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(
      createProduct({
        name: name,
        isbn: brand,
        author: authorId,
      })
    );
  };
  const isFormValid = name && brand && category;

  return (
    <>
      <>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <FormContainer>
          <h1>Add book</h1>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Author</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {category ? category : "Please select an author"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {dropdownData?.map((r) => (
                      <Dropdown.Item
                        onClick={() => {
                          setCategory(`${r.first_name}  ${r.last_name}`);
                          setAutorId(r._id);
                        }}
                      >
                        {`${r.first_name}  ${r.last_name}`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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

export default ProductListScreen;
