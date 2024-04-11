import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { getBookById, getBooks } from '../../../utils/axios-instance';
import BookCard from '../../common/BookCard';
import DetailModal from '../../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { addToFavorites, bookToCart } from '../../../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Pagination';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { setLoader } from '../../../redux/actions/appAction';
import Loader from '../../common/Loader';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quickViewBook, setQuickViewBook] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(16);
    const [filterPrice, setFilterPrice] = useState(null);
    const [sortPriceAsc, setSortPriceAsc] = useState(true);
    const booksInCart = useSelector((state) => state.cart.cart);
    const booksInFavorites = useSelector((state) => state.data.favorites);
    const { loader } = useSelector((state) => state.app);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleQuickView = async (bookId) => {
        try {
            dispatch(setLoader(true))
            const response = await getBookById(bookId);
            setQuickViewBook(response.data);
            setShowModal(true);
            dispatch(setLoader(false))

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getBooks("books");
                setBooks(response.data);
                dispatch(setLoader(false))
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
            navigate("/cart")
        } else {
            dispatch(bookToCart(book));
        }
    };

    const handleFavourites = (book) => {
        dispatch(addToFavorites(book));
    };

    const FavButton = (book) => {
        const alreadyInFavourites = booksInFavorites.find(item => item.id === book.id);
        return alreadyInFavourites ? {
            variant: "primary",
            onClick: alreadyInFavToast,
            label: <><FontAwesomeIcon icon={faBagShopping} /></>
        } : {
            variant: "primary",
            onClick: () => handleFavourites(book),
            label: <><FontAwesomeIcon icon={faHeart} /></>
        }
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
    let currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    if (filterPrice) {
        currentBooks = currentBooks.filter(book => {
            const price = book.price;
            return price >= filterPrice.min && price <= filterPrice.max;
        });
    }

    currentBooks.sort((a, b) => {
        if (sortPriceAsc) {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const alreadyInFavToast = () => {
        toast.error("Already In Favourites!")
    };

    return (
        <>
            {loader && <Loader />}
            <div className="subCategory-heading-container">
                <h2 className='playfair-display-mygooglefont'>Explore All Books Across The Story Sphere.</h2>
                <div className='d-flex align-items-center justify-content-center'>
                    <DropdownButton id="dropdown-basic-button" title="Filter" variant="info" className="me-2">
                        <Dropdown.Item onClick={() => setFilterPrice({ min: 100, max: 500 })}>100 - 500</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterPrice({ min: 500, max: 1000 })}>500 - 1000</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterPrice({ min: 1000, max: 1500 })}>1000 - 1500</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterPrice({ min: 1500, max: 2000 })}>1500 - 2000</Dropdown.Item>
                    </DropdownButton>
                    <Button onClick={() => setSortPriceAsc(!sortPriceAsc)}>Sort by Price {sortPriceAsc ? '↑' : '↓'}</Button>
                </div>
            </div>

            <div className="books-container">
                {currentBooks.map((book, index) => (
                    <BookCard key={book.id} book={book} onQuickView={() => handleQuickView(book.id)} buttons={buttons(book)} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(books.length / booksPerPage)} onPageChange={paginate} />
            <DetailModal show={showModal} quickViewBook={quickViewBook} onHide={() => setShowModal(false)} />
        </>
    );
};

export default Books;
