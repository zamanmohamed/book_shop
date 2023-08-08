import React, { useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const [showBookData, setShowBookdata] = useState(true);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" CollapseOnSelect>
        <Container>
          <LinkContainer
            to="/"
            onClick={() => {
              setShowBookdata(true);
            }}
          >
            <Navbar.Brand>Books</Navbar.Brand>
          </LinkContainer>
          <LinkContainer
            to="/author"
            onClick={() => {
              setShowBookdata(false);
            }}
          >
            <Navbar.Brand>Authors</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {showBookData ? (
            <Navbar.Collapse className="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/addbook">
                  <Nav.Link>
                    <i className="fas fa-book"></i> add new book
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse className="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/addauthor">
                  <Nav.Link>
                    <i className="fas fa-user"></i> add new author
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
