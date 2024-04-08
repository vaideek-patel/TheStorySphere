import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../../../utils/axios-instance';
import "../../../Global.css"
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist } from '../../../redux/actions/dataAction';
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

    return (
        <Container className="my-5">
            <Row>
                <Col md={3}>
                    <img src={book.image} alt="Book Cover" className="book-image" />
                </Col>
                <Col md={6}>
                    <h2 className='playfair-display-mygooglefont '>{book.name}</h2>
                    <p className='lora-mygooglefont'>{book.author}</p>
                    <div className="d-flex mb-3">
                        <Button variant="primary" className="me-2">
                            <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                            Add to Cart
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
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* Additional details or reviews section can be added here */}
                </Col>
            </Row>
        </Container>
    );
}

export default BookDetailPage;
