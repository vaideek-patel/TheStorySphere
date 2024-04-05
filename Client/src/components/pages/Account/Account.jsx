import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate()
    const viewPlacedOrders = () => {
        navigate("/manage-orders")
    }
    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Welcome to Your Account</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5>Account Details</h5>
                                    <p>Email: example@example.com</p>
                                    <p>Name: John Doe</p>
                                    <Button variant="primary">Edit Account</Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>Orders</h5>
                                    <Button variant="secondary" onClick={viewPlacedOrders}>View Orders</Button>
                                </ListGroup.Item>
                                {/* Add other necessary details here */}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Account;
