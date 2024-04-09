import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../../Global.css"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorites } from '../../redux/actions/dataAction';

const BookCard = ({ book, onQuickView, buttons }) => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.role.user.id)
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate()

    const handleCardClick = (book) => {
        navigate(`/books/${book.id}`)
    }
    const handleFavourites = (book) => {
        console.log(book)
        dispatch(addToFavorites(book))
    }
    return (
        <div className="col mb-3 p-2">
            <Card
                className="mx-auto"
                style={{
                   minHeight: '470px',
                    width: '16rem',
                    cursor: 'pointer',
                    margin: '0 10px',
                    border: 'none',
                    position: 'relative',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
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
                    <Card.Title onClick={() => handleCardClick(book)} className='playfair-display-mygooglefont custom1'>{book.name}</Card.Title>
                    <Card.Text className='lora-mygooglefont'>{book.author}</Card.Text>
                    <Card.Text>₹{book.price}</Card.Text>
                    <div className="d-flex justify-content-between allign-item-center w-100 custom2">
                        {buttons.map((button, index) => (

                            <Button key={index} className="rounded-pill" variant={button.variant} onClick={() => button.onClick(book)}>
                                {button.icon && <FontAwesomeIcon icon={button.icon} />}
                                {button.label}
                            </Button>

                        ))}
                    </div>
                    {/* <div className="d-flex justify-content-between w-100">
                        
                    </div> */}
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookCard;
