import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, getReviewsById } from '../../../utils/axios-instance';
import "../../../Global.css"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorites, bookToCart } from '../../../redux/actions/dataAction';
import { toast } from "react-toastify";

const BookDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [book, setBook] = useState(null);
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.role.user.id);
    const booksInCart = useSelector((state) => state.cart.cart)
    const booksInFavorites = useSelector((state) => state.data.favorites)
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(id);
                console.log(response.data)
                setBook(response.data);
                const reviewIds = response.data.reviews;
                const reviewPromises = reviewIds.map(reviewId => getReviewsById(reviewId));
                const reviewsResponses = await Promise.all(reviewPromises);
                console.log(reviewsResponses)
                const reviewsData = reviewsResponses.map(response => response.data);
                console.log(reviewsData[0])
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id, userId]);

    const alreadyInFavToast = (book) => {
        const alreadyInFavourites = booksInFavorites.find(item => item.id === book.id);
        toast.error("Already In Favourites!")
    }

    if (!book) {
        return <div>Loading...</div>;
    }

    const handleCart = (book) => {
        const alreadyInCart = booksInCart.find(item => item.id === book.id);
        if (alreadyInCart) {
            console.log("Book is already in the cart")
        }
        else {
            dispatch(bookToCart(book));
        }
    };

    const cartButton = () => {
        const bookalreadyInCart = booksInCart.find(item => item.id === book.id);
        return bookalreadyInCart ? {
            variant: 'danger',
            onClick: () => navigate("/cart"),
            label: <><FontAwesomeIcon icon={faShoppingCart} /> In Cart</>
        } : {
            variant: 'danger',
            onClick: () => handleCart(book),
            label: <><FontAwesomeIcon icon={faShoppingCart} />Add to Cart</>
        };
    };

    const FavButton = () => {
        console.log(book);
        const alreadyInFavourites = booksInFavorites.find(item => item.id === book.id);
        return alreadyInFavourites ? {
            variant: "primary",
            onClick: alreadyInFavToast,
            label: <><FontAwesomeIcon icon={faBagShopping} /></>
        } : {
            variant: "primary",
            onClick: () => dispatch(addToFavorites(book)),
            label: <><FontAwesomeIcon icon={faHeart} /></>
        }
    };

    const handleLeaveReview = (id) => {
        navigate(`/buyer/leaveAReview/${id}`)
    }




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
                        <Button variant={FavButton().variant} className="me-2" onClick={FavButton().onClick}>
                            {FavButton().label}
                        </Button>
                    </div>
                    <p className='lora-mygooglefont'>{book.description}</p>
                    <hr className="my-4" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3 className='playfair-display-mygooglefont'>Book Details</h3>
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
                                <td>{book.SKU}</td>
                            </tr>
                            <tr>
                                <td>EAN</td>
                                <td>{book.EAN}</td>
                            </tr>
                            <tr>
                                <td>Language</td>
                                <td>{book.Language}</td>
                            </tr>
                            <tr>
                                <td>Binding</td>
                                <td>{book.Binding}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3 className='playfair-display-mygooglefont'>Customer Reviews!</h3>
                        <Button variant="primary" onClick={handleLeaveReview}>Leave a Review</Button>
                    </div>
                    {reviews.length > 0 ? (
                        <div className="card-deck">
                            {reviews.map((review, index) => (
                                <div className="card mt-2" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{review.title}</h5>
                                        <p className="card-text">{review.content}</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">Posted by {review.reviewerName}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='playfair-display-mygooglefont'>No reviews available for this book.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default BookDetailPage;
