import React, { useState } from 'react';
import "../../../Global.css";
import { useSelector } from "react-redux";
import BookCard from '../../common/BookCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeFromFavorites } from '../../../redux/actions/dataAction';
import { useDispatch } from "react-redux";
import DetailModal from '../../common/Modal';
import { getBookById } from '../../../utils/axios-instance';

const Favourites = () => {
  const [quickViewBook, setQuickViewBook] = useState();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const removeFavorite = ({ id }) => {
    console.log("remove Buttons", id);
    dispatch(removeFromFavorites(id));
  };
  const cartButton = (book) => {
    const label = "Remove from Favourite";
    return {
      variant: 'danger',
      onClick: () => removeFavorite(book),
      label: <><FontAwesomeIcon icon={faTrash} /> {label}</>
    };
  };
  const buttons = (book) => [cartButton(book)];

  const favorites = useSelector((state) => state.data.favorites);

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
  return (
    <>
      <div className="subCategory-heading-container">
        <h2 className='playfair-display-mygooglefont'>Move Your Favourites To Cart.</h2>
      </div>
      {favorites.length === 0 ? (
        <div className="empty-favorites-message">
          <h3 className='playfair-display-mygooglefont text-center'>There are currently no books in your favourites.</h3>
        </div>
      ) : (
        <>
          <div className="books-container">
            {favorites.map((book, index) => (
              <BookCard key={book.id} book={book} onQuickView={handleQuickView} buttons={buttons(book)} />
            ))}
          </div>
          <DetailModal show={showModal} quickViewBook={quickViewBook} onHide={() => setShowModal(false)} />
        </>
      )}
    </>
  );
};

export default Favourites;
