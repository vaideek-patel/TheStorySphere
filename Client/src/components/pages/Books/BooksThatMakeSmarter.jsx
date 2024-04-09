import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getBooks } from '../../../utils/axios-instance';
import { useSelector, useDispatch } from 'react-redux';
import { bookToCart } from '../../../redux/actions/dataAction';
import { Link } from 'react-router-dom';

const BooksThatMakeSmarter = () => {
    const dispatch = useDispatch();
    const booksInCart = useSelector((state) => state.cart.cart);
    const [smartBooks, setSmartBooks] = useState([]);

    useEffect(() => {
        const fetchBestSeller = async () => {
            try {
                const response = await getBooks("books?AdditionalBookDetails.BooksThatMakeYouSmarter=yes");
                if (response.success) {
                    console.log(response);
                    setSmartBooks(response.data);
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        fetchBestSeller();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {smartBooks.map(book => {
                    const alreadyInCart = booksInCart.find(item => item.id === book.id)
                    return (
                        <div key={book.id} className="col-md-12">
                            <Card className="mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex overflow-hidden">
                                        <img src={book.image} style={{ height: '18rem', objectFit: 'contain' }} alt={book.title} />
                                    </div>
                                    <div className="col-md-8">
                                        <Card.Body>
                                            <Card.Title className='playfair-display-mygooglefont'>{book.name}</Card.Title>
                                            <Card.Text className='lora-mygooglefont'>{book.author}</Card.Text>
                                            <Card.Text> ₹{book.price}</Card.Text>
                                            <Card.Text className='playfair-display-mygooglefont'>{book.description}</Card.Text>
                                            <div className="justify-content-between w-100">
                                                {alreadyInCart ? (
                                                    <Link to="/cart">
                                                        <Button variant="danger" className="rounded-pill">
                                                            <FontAwesomeIcon icon={faShoppingCart} /> In Cart
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button variant="danger" className="rounded-pill" onClick={() => dispatch(bookToCart(book))}>
                                                        <FontAwesomeIcon icon={faShoppingCart} /> ADD TO CART
                                                    </Button>
                                                )}
                                                <Button variant="danger" className="rounded-pill ms-3">
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default BooksThatMakeSmarter;

