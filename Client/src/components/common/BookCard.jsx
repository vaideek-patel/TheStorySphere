import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

const BookCard = ({ book, onQuickView }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="col mb-3" style={{ margin: '0 auto' }}>
            <Card
                className="mx-auto"
                style={{
                    width: '18rem',
                    cursor: 'pointer',
                    margin: '0 10px',
                    border: 'none',
                    position: 'relative',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', position: 'relative' }}>
                    <Card.Img variant="top" src={book.image} style={{ height: '18rem', objectFit: 'contain' }} />
                    <Button
                        variant="light"
                        className="rounded-pill"
                        style={{
                            visibility: hovered ? 'visible' : 'hidden',
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                        }}
                        onClick={() => onQuickView(book.id)}
                    >
                        Quick View
                    </Button>
                </div>
                <Card.Body className="d-flex flex-column justify-content-start align-items-start">
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                    <Card.Text>₹{book.price}</Card.Text>
                    <div className="d-flex justify-content-between w-100">
                        <Button variant="danger" className="rounded-pill">
                            <FontAwesomeIcon icon={faShoppingCart} /> ADD TO CART
                        </Button>
                        <Button variant="light" className="rounded-pill" >
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookCard;
