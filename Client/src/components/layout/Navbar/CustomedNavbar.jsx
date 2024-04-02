import React from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../../../public/The Story Sphere_transparent(12).png"


const CustomedNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const handleBooksPage = () => {
    navigate("/books")
  }
  const handleLogOut = () => {
    dispatch(logout())
  }
  return (
    <>
      {/* <div className='text-center ' style={{ backgroundColor: '#e0f7fa' }}>
        <p className="text-center p-1">
          <FontAwesomeIcon icon={faTruckFast} /> Enjoy <strong>Free Shipping</strong> on orders above Rs.2000
        </p>
      </div> */}
      <Navbar bg="light" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/" >
          <img src={Logo} alt="The Story Sphere" width="auto" height="50" />
        </Navbar.Brand>
        <Container>
          <div className="search-bar-container">
            <Form className="d-flex justify-content-center">
              <FormControl
                type="search"
                placeholder="Search books, authors, ISBNs"
                className="bg-white text-light placeholder-white"
                aria-label="Search"
              />
            </Form>
          </div>
          <Nav>
            {isLoggedIn === true ? (
              <>
                <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div className="navbar-footer">
        <ul className='d-flex justify-content-center align-items-center' style={{ listStyleType: 'none', padding: 0 }}>
          <li className="mx-3">
            <span style={{ cursor: 'pointer' }}>Special Offers</span>
            <ul className="dropdown-list">
              <li>There's a 10% discount on these special titles every month from DK here!</li>
              <li>Get 15% off select titles from FSG & Picador here!</li>
              <li>Get 10% off THE WOMEN and more by Kristin Hannah!</li>
              <li>Get 15% off these classic Cormac McCarthy books!</li>
              <li>Get 10% off these books in the Grumpy Monkey series!</li>
              <li>Get 10% off OTHERWORLDLY and more by F.T. Lukens!</li>
              <li>Get 10% off these nerdy spring reads from MIT Press!</li>
            </ul>
          </li>
          <li className="mx-3">
            <span style={{ cursor: 'pointer' }}>TOP 50</span>
            <ul className="dropdown-list">
              <li>Fiction</li>
              <li>Non-Fiction</li>
              <li>Business and Management</li>
              <li>Regional Books</li>
              <li>Young Adults</li>
            </ul>
          </li>
          <li className="mx-3">Recently Launched</li>
          <li className="mx-3">
            <span style={{ cursor: 'pointer' }} onClick={handleBooksPage}>Explore Books</span>
            <ul className="dropdown-list" style={{ marginLeft: "-200px" }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', }}>
                  <h6>Fiction</h6>
                  <li> Fiction 1</li>
                  <li>Fiction 2</li>
                  <li>Fiction 3</li>
                </div>
                <div style={{ flex: '1', }}>
                  <h6>Non-Fiction</h6>
                  <li> Non-Fiction 1</li>
                  <li> Non-Fiction 2</li>
                  <li> Non-Fiction 3</li>
                </div>
                <div style={{ flex: '1', }}>
                  <h6>Business and Management</h6>
                  <li> Business and Management 1</li>
                  <li>Business and Management 2</li>
                  <li> Business and Management 3</li>
                </div>
                <div style={{ flex: '1', }}>
                  <h6>Regional Books</h6>
                  <li> Regional Books 1</li>
                  <li>Regional Books  2</li>
                  <li>Regional Books 3</li>
                </div>
                <div style={{ flex: '1', }}>
                  <h6>Featured Books</h6>
                  <li> Featured Books 1</li>
                  <li>Featured Books  2</li>
                  <li>Featured Books 3</li>
                </div>
              </div>
            </ul>
          </li>

          <li className="mx-3">Wishlists and Registeries</li>
          <li className="mx-3">BEST SELLERS</li>
        </ul>
      </div>
    </>
  );
}

export default CustomedNavbar;


