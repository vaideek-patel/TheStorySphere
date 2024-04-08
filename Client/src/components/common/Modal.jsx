import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"

function DetailModal({ show, onHide, quickViewBook, data }) {
    const navigate = useNavigate()

    const handleInDetailView = (book) => {
        console.log(book.id)
        navigate(`/books/${book.id}`)
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            size="lg"
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title>{quickViewBook ? quickViewBook.name : "Book Details"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {quickViewBook ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1, marginRight: '20px' }}>
                                <img src={quickViewBook.image} alt={quickViewBook.name} style={{ maxWidth: '100%' }} />
                            </div>
                            <div style={{ flex: 2 }}>
                                <p><strong>Author:</strong> {quickViewBook.author || 'N/A'}</p>
                                <p><strong>Category:</strong> {quickViewBook.category || 'N/A'}</p>
                                <p><strong>Description:</strong> {quickViewBook.description || 'N/A'}</p>
                                <p><strong>Price:</strong> {quickViewBook.price || 'N/A'}</p>
                                <p><strong>Release Date:</strong> {quickViewBook.releaseDate || 'N/A'}</p>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>Close</Button>
                            <Button variant="primary" onClick={() => handleInDetailView(quickViewBook)}>View In Detail</Button>
                        </Modal.Footer>
                    </>
                ) : (
                    data && data.map((book, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ flex: 1, marginRight: '20px' }}>
                                <img src={book.image} alt={book.name} style={{ maxWidth: '100%' }} />
                            </div>
                            <div style={{ flex: 2 }}>
                                <p><strong>Name:</strong> {book.name || 'N/A'}</p>
                                <p><strong>Author:</strong> {book.author || 'N/A'}</p>
                                <p><strong>Category:</strong> {book.category || 'N/A'}</p>
                                <p><strong>Description:</strong> {book.description || 'N/A'}</p>
                                <p><strong>Price:</strong> {book.price || 'N/A'}</p>
                                <p><strong>Release Date:</strong> {book.releaseDate || 'N/A'}</p>
                            </div>
                        </div>
                    ))
                )}
            </Modal.Body>
        </Modal>
    );
}

DetailModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    quickViewBook: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
};

export default DetailModal;
