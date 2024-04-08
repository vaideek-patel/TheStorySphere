import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../../../public/The Story Sphere_transparent(12).png"
import { removeRole } from '../../../redux/actions/roleActions';
import { clearCart, removeData } from '../../../redux/actions/dataAction';
import { getSubcategoriesByCategoryId, updateWishlist } from '../../../utils/axios-instance';


const CustomedNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [subcategories, setSubcategories] = useState({});
  // const isLoggedIn = useSelector((state) => state.role.user)
  const isLoggedIn = useSelector((state) => state.role)
  const WishList = useSelector((state) => state.data.wishList)

  const handleRecentlyLaunced = () => {
    navigate("/books/recentlyLaunched")
  }
  const handleBooksPage = () => {
    navigate("/books")
  }
  const handleWishlistRegistry = () => {
    navigate("/info/wishlist-and-registry")
  }

  const handleBestSellers = () => {
    navigate("/categories/popular-books")
  }
  const handleSubCategory = (data) => {
    const subCategoryName = data.name.replace(/ /g, '_');
    navigate(`/collections/${data.categoryId}/${data.id}/${subCategoryName}`)
  }

  useEffect(() => {
    fetchSubcategories(1),
      fetchSubcategories(2)
    fetchSubcategories(3)
    fetchSubcategories(4)
  }, [])
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await getSubcategoriesByCategoryId(categoryId);
      setSubcategories(prevState => ({
        ...prevState,
        [categoryId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleLogOut = async () => {
    if (isLoggedIn) {
      const userWishlist = WishList.find(wishlist => wishlist.owner === isLoggedIn.id);

      if (userWishlist) {
        try {
          const response = await updateWishlist(isLoggedIn.id, userWishlist.id, userWishlist);
          if (response.success) {
            console.log("Wishlist data updated successfully.");
          } else {
            console.error("Failed to update wishlist data:", response.error);
          }
        } catch (error) {
          console.error("Error while updating wishlist data:", error);
        }
      } else {
        console.error("User's wishlist not found.");
      }

      dispatch(removeRole());
      dispatch(removeData());
      dispatch(clearCart());
      navigate("/login");
    }
  };

  const handleSellerLogOut = () => {
    dispatch(removeRole());
    navigate("/seller/login");

  }

  const handleAdminLogOut = () => {
    dispatch(removeRole());
    navigate("/adminLogin")
  }

  const handleSpecialOffers = () => {
    navigate("/lists/special-offers-on-TheStorySphere")
  }
  return (
    <>
      <div className='text-center mb-0 ' style={{ backgroundColor: '#e0f7fa' }}>
        <p className="text-center p-1 mb-0">
          <FontAwesomeIcon icon={faTruckFast} /> Enjoy <strong>Free Shipping</strong> on orders above Rs.2000
        </p>
      </div>
      <Navbar bg="light" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/" className='ms-4' >
          <img src={Logo} alt="The Story Sphere" width="auto" height="50" />
        </Navbar.Brand>
        <Container>
          {isLoggedIn.user !== null ? (
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
          ) : (
            null
          )}
          <Nav>
            {isLoggedIn.isAuth !== false ? (
              <>
                {isLoggedIn.user && (
                  <>
                    <Nav.Link as={Link} to="/account">Account</Nav.Link>
                    <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
                  </>
                )}
                {isLoggedIn.seller && (
                  <>
                    <Nav.Link onClick={handleSellerLogOut}>Logout Seller</Nav.Link>
                  </>
                )}
                {isLoggedIn.admin && (
                  <>
                    <Nav.Link as={Link} to="/admin/manage-category">Manage Category</Nav.Link>
                    <Nav.Link as={Link} to="/admin/manage-sub-category">Manage Sub-Category</Nav.Link>
                    <Nav.Link as={Link} to="/admin/manage-books">Manage Books</Nav.Link>
                    <Nav.Link as={Link} to="/admin/manage-orders">Manage Orders</Nav.Link>
                    <Nav.Link as={Link} to="/admin/manage-sellers">Manage Sellers</Nav.Link>
                    <Nav.Link onClick={handleAdminLogOut}>Logout Admin</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {isLoggedIn.user !== null ? (
        <div className="navbar-footer">
          <ul className='d-flex justify-content-center align-items-center mb-0 pb-3' style={{ listStyleType: 'none', padding: 0 }}>
            <li className="mx-3">
              <span style={{ cursor: 'pointer' }} onClick={handleSpecialOffers}>Special Offers</span>
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
            <li className="mx-3" style={{ cursor: 'pointer' }} onClick={handleRecentlyLaunced}>Recently Launched</li>
            <li className="mx-3">
              <span style={{ cursor: 'pointer' }} onClick={handleBooksPage}>Explore Books</span>
              <ul className="dropdown-list" style={{ marginLeft: "-200px" }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', }}>
                    <h6>Fiction</h6>
                    {subcategories['1'] && subcategories['1'].map(subcat => (
                      <li key={subcat.id} onClick={() => handleSubCategory(subcat)}>{subcat.name}</li>
                    ))}
                  </div>
                  <div style={{ flex: '1', }}>
                    <h6>Non-Fiction</h6>
                    {subcategories['2'] && subcategories['2'].map(subcat => (
                      <li key={subcat.id} onClick={() => handleSubCategory(subcat)}>{subcat.name}</li>
                    ))}
                  </div>
                  <div style={{ flex: '1', }}>
                    <h6>Business and Management</h6>
                    {subcategories['3'] && subcategories['3'].map(subcat => (
                      <li key={subcat.id} onClick={() => handleSubCategory(subcat)}>{subcat.name}</li>
                    ))}
                  </div>
                  <div style={{ flex: '1', }}>
                    <h6>Regional Books</h6>
                    {subcategories['4'] && subcategories['4'].map(subcat => (
                      <li key={subcat.id} onClick={() => handleSubCategory(subcat)}>{subcat.name}</li>
                    ))}
                  </div>
                </div>
              </ul>
            </li>

            <li className="mx-3" style={{ cursor: 'pointer' }} onClick={handleWishlistRegistry}>Wishlists and Registeries</li>
            <li className="mx-3" style={{ cursor: 'pointer' }} onClick={handleBestSellers}>BEST SELLERS</li>
          </ul>
        </div>
      ) : (
        null
      )}
    </>
  );
}

export default CustomedNavbar;


