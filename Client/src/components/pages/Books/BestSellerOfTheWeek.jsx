import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getBooks } from '../../../utils/axios-instance';
import { addToFavorites, bookToCart } from '../../../redux/actions/dataAction';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";


const BestSellerOfTheWeek = () => {
    const dispatch = useDispatch()
    const [bestSellersOfTheWeek, setBestSellersOfTheWeek] = useState([]);
    const booksInCart = useSelector((state) => state.cart.cart);
    const booksInFavorites = useSelector((state) => state.data.favorites)
    useEffect(() => {
        const fetchBestSellersOfTheWeekBooks = async () => {
            try {
                const response = await getBooks("books?AdditionalBookDetails.BestSellerOfTheWeek=yes");
                if (response.success) {
                    console.log(response);
                    setBestSellersOfTheWeek(response.data);
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        fetchBestSellersOfTheWeekBooks();
    }, []);

    const alreadyInFavToast = () => {
        toast.error("Already In Favourites!")
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {bestSellersOfTheWeek.map(book => {
                    const alreadyInCart = booksInCart.find(item => item.id === book.id);
                    const alreadyInFavourites = booksInFavorites.find(item => item.id === book.id);
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
                                            <div className=" justify-content-between w-100">
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
                                                {alreadyInFavourites ? (

                                                    <Button variant="primary" className="rounded-pill ms-3" onClick={alreadyInFavToast}>
                                                        <FontAwesomeIcon icon={faBagShopping} />
                                                    </Button>

                                                ) : (
                                                    <Button variant="primary" className="rounded-pill ms-3" onClick={() => dispatch(addToFavorites(book))}>
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </Button>
                                                )}
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

export default BestSellerOfTheWeek;

