import React, { useEffect, useState } from 'react';
import { getBookById, getBooks } from '../../../utils/axios-instance';
import BookCard from '../../common/BookCard';
import "../../../Global.css";
import DetailModal from '../../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToFavorites, bookToCart } from '../../../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Pagination';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quickViewBook, setQuickViewBook] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(16);
    const booksInCart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleQuickView = (bookId) => {
        const fetchBookData = async () => {
            try {
                const response = await getBookById(bookId);
                setQuickViewBook(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBookData();
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


    const handleFavourites = (book) => {
        console.log(book)
        dispatch(addToFavorites(book))

    }
    const FavButton = (book) => {
        // const alreadyInCart = booksInCart.find(item => item.id === book.id);
        return {
            variant: "primary",
            onClick: () => handleFavourites(book),
            label: <><FontAwesomeIcon icon={faHeart} /></>
        };
    };


    const cartButton = (book) => {
        const alreadyInCart = booksInCart.find(item => item.id === book.id);
        const label = alreadyInCart ? "In Cart" : "Add to Cart";
        return {
            variant: 'danger',
            onClick: () => handleCart(book),
            label: <><FontAwesomeIcon icon={faShoppingCart} /> {label}</>
        };
    };

    const buttons = (book) => [cartButton(book), FavButton(book)];

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="subCategory-heading-container">
                <h2 className='playfair-display-mygooglefont'>Explore All Books Across The Story Sphere.</h2>
            </div>
            <div className="books-container">
                {currentBooks.map((book, index) => (
                    <BookCard key={book.id} book={book} onQuickView={handleQuickView} buttons={buttons(book)} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(books.length / booksPerPage)} onPageChange={paginate} />
            <DetailModal show={showModal} quickViewBook={quickViewBook} onHide={() => setShowModal(false)} />
        </>
    );
};

export default Books;
