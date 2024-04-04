import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DetailModal({ show, onHide, quickViewBook }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{quickViewBook ? quickViewBook.name : "Book Details"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, marginRight: '20px' }}>
                        <img src={quickViewBook ? quickViewBook.image : ''} alt={quickViewBook ? quickViewBook.name : ''} style={{ maxWidth: '100%' }} />
                    </div>
                    <div style={{ flex: 2 }}>
                        <p><strong>Author:</strong> {quickViewBook ? quickViewBook.author : 'N/A'}</p>
                        <p><strong>Category:</strong> {quickViewBook ? quickViewBook.category : 'N/A'}</p>
                        <p><strong>Description:</strong> {quickViewBook ? quickViewBook.description : 'N/A'}</p>
                        <p><strong>Price:</strong> {quickViewBook ? quickViewBook.price : 'N/A'}</p>
                        <p><strong>Release Date:</strong> {quickViewBook ? quickViewBook.releaseDate : 'N/A'}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary">Add to Cart</Button>
            </Modal.Footer>
        </Modal>
    );
}

DetailModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    quickViewBook: PropTypes.object,
};

export default DetailModal;
