// Books.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../../../utils/axios-instance';
import BookCard from '../../common/BookCard';
import "../../../Global.css"
import DetailModal from '../../common/Modal';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleQuickView = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
                console.log(response);
            } catch (error) {
                console.error("Error while fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <>
            <div className="books-container">
                {books.map((book, index) => (
                    <BookCard key={book.id} book={book} onQuickView={handleQuickView} />
                ))}
            </div>
            <DetailModal show={showModal} onHide={() => setShowModal(false)} />
        </>
    );
};

export default Books;
