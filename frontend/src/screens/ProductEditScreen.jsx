import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const productId = useParams().id;
  const history = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [authorId, setAutorId] = useState("");
  const [dropdownData, setDropdownData] = useState([]);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history("/");
      window.location.reload(false);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);

        setBrand(product.isbn);
        setCategory(`${product.author.first_name} ${product.author.last_name}`);
        setAutorId(product.author._id);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  useEffect(() => {
    const featchAuthors = async () => {
      const { data } = await axios.get("/api/author");
      setDropdownData(data.authors);
      console.log(data.authors, "datadatadafagahah");
    };

    featchAuthors();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        name: name,
        isbn: brand,
        author: authorId,
        _id: productId,
      })
    );
  };

  const isFormValid = name && brand && authorId;

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Book</h1>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Last Name</Form.Label>
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
                  {category}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {dropdownData?.map((r) => (
                    <Dropdown.Item
                      href="#/action-1"
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
