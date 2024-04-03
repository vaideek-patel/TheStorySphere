import React, { useEffect, useState } from 'react';
import { getBooks } from '../../../utils/axios-instance';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const RecentlyLaunched = () => {
    const [recentlyLaunchedBooks, setRecentlyLaunchedBooks] = useState([]);

    useEffect(() => {
        const fetchRecentlyLaunchedBooks = async () => {
            try {
                const response = await getBooks("books?recentlyLaunched=yes");
                if (response.success) {
                    console.log(response);
                    setRecentlyLaunchedBooks(response.data);
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        fetchRecentlyLaunchedBooks();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {recentlyLaunchedBooks.map(book => (
                    <div key={book.id} className="col-md-12">
                        <Card className="mb-3">
                            <div className="row g-0">
                                <div className="col-md-4 d-flex overflow-hidden">
                                    <img src={book.image} style={{ height: '18rem', objectFit: 'contain' }} alt={book.title} />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{book.name}</Card.Title>
                                        <Card.Text>{book.author}</Card.Text>
                                        <Card.Text> ₹{book.price}</Card.Text>
                                        <Card.Text> {book.description}</Card.Text>
                                        <div className="d-flex justify-content-between w-100">
                                            <Button variant="danger" className="rounded-pill">
                                                <FontAwesomeIcon icon={faShoppingCart} /> ADD TO CART
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyLaunched;
