import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../../../utils/axios-instance';
import "../../../Global.css"
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist, bookToCart } from '../../../redux/actions/dataAction';
// import { getUserWishlists } from "../../../utils/axios-instance";

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedWishlist, setSelectedWishlist] = useState('Select Wishlist');
    // const [wishlists, setWishlists] = useState([]);
    const userId = useSelector((state) => state.role.user.id);
    const wishlists = useSelector((state) => state.data.wishList)
    const booksInCart = useSelector((state) => state.cart.cart)


    const handleWishlistSelect = (wishlist) => {
        console.log(wishlist)
        dispatch(addToWishlist(wishlist.id, book));
    }

    const handleCreateNewWishlist = () => {
        navigate("/wishlists/new")
    }
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(id);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        // const fetchWishlists = async () => {
        //     try {
        //         const response = await getUserWishlists(userId);
        //         console.log(response)
        //         setWishlists(response.data);
        //     } catch (error) {
        //         console.error('Error fetching wishlists:', error);
        //     }
        // };

        fetchBook();
        // fetchWishlists();
    }, [id, userId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    // const handleWishlistSelect = (wishlist) => {
    //     setSelectedWishlist(wishlist.name); 
    // };

    const handleCart = (book) => {
        const bookId = book.id;
        const alreadyInCart = booksInCart.find(item => item.id === bookId);
        if (alreadyInCart) {
            console.log("Book is already in the cart")
        }
        else {
            dispatch(bookToCart(book));
        }
    };

    const cartButton = () => {
        const alreadyInCart = booksInCart.find(item => item.id === book.id);
        const label = alreadyInCart ? "In Cart" : "Add to Cart";
        return {
            variant: 'danger',
            onClick: () => handleCart(book),
            label: <><FontAwesomeIcon icon={faShoppingCart} /> {label}</>
        };
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={3}>
                    <img src={book.image} alt="Book Cover" className="book-image" />
                </Col>
                <Col md={6}>
                    <h2 className='playfair-display-mygooglefont'>{book.name}</h2>
                    <p className='lora-mygooglefont'>{book.author} (Author)</p>
                    <p className='lora-mygooglefont'>₹ {book.price}</p>
                    <div className="d-flex mb-3">
                        <Button variant={cartButton().variant} className="me-2" onClick={cartButton().onClick}>
                            {cartButton().label}
                        </Button>
                        {wishlists.length === 0 ? (
                            <Button variant="primary" className="me-2">Create a Wishlist first</Button>
                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faHeart} className="me-1" />
                                    Add to Wishlist
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {wishlists.map((wishlist, index) => (
                                        <Dropdown.Item key={index} onClick={() => handleWishlistSelect(wishlist)}>
                                            {wishlist.name}
                                        </Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleCreateNewWishlist}>
                                        Create a new wishlist
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                    <p className='lora-mygooglefont'>{book.description}</p>
                    <hr className="my-4" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>Book Details</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Title</td>
                                <td>{book.name}</td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td>{book.author}</td>
                            </tr>
                            <tr>
                                <td>SKU</td>
                                <td>{book.sku}</td>
                            </tr>
                            <tr>
                                <td>EAN</td>
                                <td>{book.ean}</td>
                            </tr>
                            <tr>
                                <td>Language</td>
                                <td>{book.language}</td>
                            </tr>
                            <tr>
                                <td>Binding</td>
                                <td>{book.binding}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h3>Customer Reviews</h3>
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Great Book!</h5>
                                <p className="card-text">This book is amazing. I couldn't put it down!</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Posted by John Doe</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Highly Recommend</h5>
                                <p className="card-text">Such a well-written book. I highly recommend it to everyone!</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Posted by Jane Smith</small>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default BookDetailPage;
