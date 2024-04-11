import React, { useEffect, useState } from 'react';
import { getBooks } from '../../../utils/axios-instance';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, bookToCart } from '../../../redux/actions/dataAction';
import { toast } from "react-toastify";
import { setLoader } from '../../../redux/actions/appAction';
import Loader from '../../common/Loader';

const RecentlyLaunched = () => {
    const dispatch = useDispatch();
    const [recentlyLaunchedBooks, setRecentlyLaunchedBooks] = useState([]);
    const booksInCart = useSelector((state) => state.cart.cart);
    const booksInFavorites = useSelector((state) => state.data.favorites)
    const { loader } = useSelector((state) => state.app);


    useEffect(() => {
        const fetchRecentlyLaunchedBooks = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getBooks("books?recentlyLaunched=yes");
                if (response.success) {
                    console.log(response);
                    setRecentlyLaunchedBooks(response.data);
                    dispatch(setLoader(false))

                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }

            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        fetchRecentlyLaunchedBooks();
    }, []);


    const alreadyInFavToast = () => {
        toast.error("Already In Favourites!")
    }

    return (
        <>
            {loader && <Loader/>}

            <div className="container mt-4">
                <div className="row">
                    {recentlyLaunchedBooks.map(book => {
                        const alreadyInCart = booksInCart.find(item => item.id === book.id);
                        const alreadyInFavourites = booksInFavorites.find(item => item.id === book.id);
                        return (
                            <div key={book.id} className="col-md-12">
                                <Card className="mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-2 d-flex overflow-hidden custom-3">
                                            <img src={book.image} style={{}} alt={book.title} />
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
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default RecentlyLaunched;
