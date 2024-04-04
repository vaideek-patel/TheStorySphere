import React, { useEffect, useState } from 'react';
import { getBookById, getBooks } from '../../../utils/axios-instance';
import BookCard from '../../common/BookCard';
import "../../../Global.css"
import DetailModal from '../../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { bookToCart } from '../../../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';


const Books = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quickViewBook, setQuickViewBook] = useState()
    const booksInCart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch()

    const handleQuickView = (bookId) => {
        console.log(bookId)

        const fetchBookData = async () => {
            try {
                const response = await getBookById(bookId);
                console.log(response)
                setQuickViewBook(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBookData()
        setShowModal(true);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks("books");
                setBooks(response.data);
            } catch (error) {
                console.error("Error while fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

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

    const cartButton = (book) => {
        const alreadyInCart = booksInCart.find(item => item.id === book.id);
        const label = alreadyInCart ? "Added to Cart" : "Add to Cart";
        return {
            variant: 'danger',
            onClick: () => handleCart(book),
            label: <><FontAwesomeIcon icon={faShoppingCart} /> {label}</>
        };
    };

    const buttons = (book) => [cartButton(book)];


    return (
        <>
            <div className="books-container">
                {books.map((book, index) => (
                    <BookCard key={book.id} book={book} onQuickView={handleQuickView} buttons={buttons(book)} />
                ))}
            </div>
            <DetailModal show={showModal} quickViewBook={quickViewBook} onHide={() => setShowModal(false)} />
        </>
    );
};

export default Books;
