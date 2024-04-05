import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooksBySubcategoryId, getBookById } from '../../../utils/axios-instance';
import BookCard from '../../common/BookCard';
import DetailModal from '../../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { bookToCart } from '../../../redux/actions/dataAction';

const Collections = () => {
  const { subCategoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState(null);
  const booksInCart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpecificBooks = async (categoryId) => {
      try {
        const response = await getBooksBySubcategoryId(categoryId);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSpecificBooks(subCategoryId);
  }, [subCategoryId]);

  const handleQuickView = async (bookId) => {
    try {
      const response = await getBookById(bookId);
      setQuickViewBook(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCart = (book) => {
    const bookId = book.id;
    const alreadyInCart = booksInCart.find((item) => item.id === bookId);
    if (alreadyInCart) {
      console.log('Book is already in the cart');
    } else {
      dispatch(bookToCart(book));
    }
  };

  const cartButton = (book) => {
    const alreadyInCart = booksInCart.find((item) => item.id === book.id);
    const label = alreadyInCart ? 'Added to Cart' : 'Add to Cart';
    return {
      variant: 'danger',
      onClick: () => handleCart(book),
      label: (
        <>
          <FontAwesomeIcon icon={faShoppingCart} /> {label}
        </>
      ),
    };
  };

  const buttons = (book) => [cartButton(book)];

  return (
    <>
      <div className="books-container">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            onQuickView={handleQuickView}
            buttons={buttons(book)}
          />
        ))}
      </div>
      <DetailModal
        show={showModal}
        quickViewBook={quickViewBook}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default Collections;
