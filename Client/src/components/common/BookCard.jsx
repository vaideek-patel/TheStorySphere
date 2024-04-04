import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../../Global.css"

const BookCard = ({ book, onQuickView, buttons }) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate()

    const handleCardClick = (book) => {
        navigate(`/books/${book.id}`)

    }
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
                onClick={() => handleCardClick(book)}
            >
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', position: 'relative' }}>
                    <Card.Img variant="top" src={book.image} className='book-image' />
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
                    {buttons.map((button, index) => (
                        <div className="d-flex justify-content-between w-100">
                            <Button key={index} className="rounded-pill" variant={button.variant} onClick={() => button.onClick(book)}>
                                {button.icon && <FontAwesomeIcon icon={button.icon} />}
                                {button.label}
                            </Button>
                        </div>
                    ))}
                    {/* <div className="d-flex justify-content-between w-100">
                        <Button variant="danger" className="rounded-pill" onClick={handleAddToCart}>
                            <FontAwesomeIcon icon={faShoppingCart} /> ADD TO CART
                        </Button>
                        <Button variant="light" className="rounded-pill" >
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                    </div> */}
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookCard;
