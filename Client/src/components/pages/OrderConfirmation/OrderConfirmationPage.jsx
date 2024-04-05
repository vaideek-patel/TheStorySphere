import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { getOrderById } from '../../../utils/axios-instance';
import { useParams } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const OrderedBooks = data?.finalOrderBooks?.cart;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getOrderById(id);
                if (response.success) {
                    setData(response.data);
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };
        fetchOrderDetails();
    }, [id]);

    const getLastFourDigits = (cardNumber) => {
        return cardNumber.slice(-4);
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <Card className="shadow">
                        <Card.Body>
                            <h2 className="text-center mb-4">Order Confirmation</h2>
                            <p><strong>Order ID:</strong> {data?.id}</p>
                            <h4 className="mt-4">Shipping Details</h4>
                            <Row>
                                <Col md={6}>
                                    <p><strong>First Name:</strong> {data?.shippingDetails.firstName}</p>
                                    <p><strong>Last Name:</strong> {data?.shippingDetails.lastName}</p>
                                    <p><strong>Shipping Address:</strong> {data?.shippingDetails.shippingAddress}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Company:</strong> {data?.shippingDetails.company}</p>
                                    <p><strong>City:</strong> {data?.shippingDetails.city}</p>
                                    <p><strong>State:</strong> {data?.shippingDetails.state}</p>
                                    <p><strong>Zip:</strong> {data?.shippingDetails.zip}</p>
                                </Col>
                            </Row>

                            <h4 className="mt-4">Payment Details</h4>
                            <p><strong>Ending Card Number:</strong> {data?.paymentDetails && getLastFourDigits(data.paymentDetails.cardNumber)}</p>

                            <h4 className="mt-4">Total Amount: {data?.finalOrderBooks?.totalAmount}</h4>

                            <h4 className="mt-4">Ordered Books</h4>
                            {OrderedBooks && OrderedBooks.map((book, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <Image src={book.image} alt={book.name} fluid />
                                            </Col>
                                            <Col md={8}>
                                                <Card.Title>{book.name}</Card.Title>
                                                <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                                                <Card.Text><strong>Price:</strong> ${book.price}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                            <Row className="justify-content-center mt-5">
                                <Button variant="success" className="rounded-pill mr-3">Download Invoice</Button>
                                <Button variant="primary" className="rounded-pill">Continue Shopping</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderConfirmationPage;
