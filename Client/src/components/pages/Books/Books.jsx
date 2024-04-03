import React, { useEffect, useState } from 'react';
import { getBookById, getBooks } from '../../../utils/axios-instance';
import BookCard from '../../common/BookCard';
import "../../../Global.css"
import DetailModal from '../../common/Modal';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quickViewBook, setQuickViewBook] = useState()

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
            <DetailModal show={showModal} quickViewBook={quickViewBook} onHide={() => setShowModal(false)} />
        </>
    );
};

export default Books;
