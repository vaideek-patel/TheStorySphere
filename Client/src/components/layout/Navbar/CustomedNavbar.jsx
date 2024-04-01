import React from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const CustomedNavbar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        {/* Use Link component for navigation */}
        <Navbar.Brand as={Link} to="/">The Story Sphere</Navbar.Brand>
        <Nav className="justify-content-end" style={{ flex: 'auto' }}>
          {/* Use Link component for navigation */}
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2 bg-white text-light placeholder-white"
              aria-label="Search"
            />
            <Button variant="outline-light" className="custom-search-button">Search</Button>
          </Form>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomedNavbar;
