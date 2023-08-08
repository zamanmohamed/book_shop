import "./App.css";
import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import NotFound from "./screens/NotFound";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import ViewSingleAuthorScreen from "./screens/ViewSingleAuthorScreen";
import AddAuthor from "./screens/AddAuthor";
import AuthorEditScreen from "./screens/AuthorEditScreen";
import AuthorScreen from "./screens/AuthorScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/author" element={<AuthorScreen />} />
            <Route path="product">
              <Route path=":id" element={<ProductScreen />} />
            </Route>
            <Route path="author">
              <Route path=":id" element={<ViewSingleAuthorScreen />} />
            </Route>
            <Route path="/book/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/:id/edit" element={<AuthorEditScreen />} />
            <Route path="/addbook" element={<ProductListScreen />} />
            <Route path="/addauthor" element={<AddAuthor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
