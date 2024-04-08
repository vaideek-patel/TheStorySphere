import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommonModal from "./CommonModal"
import "../../../Global.css"
import { useSelector } from 'react-redux';
import { getAccountDetailByUsertId } from '../../../utils/axios-instance';

const Account = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const currentUser = useSelector((state) => state.role.user);
    const [userDetails, setUserDetails] = useState([]); 

    const viewPlacedOrders = () => {
        navigate("/manage-orders");
    };

    const editAccount = async () => {
        setShowModal(true);
        const response = await getAccountDetailByUsertId(currentUser.id);
        setUserDetails(response.data); 
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    console.log(userDetails)

    const accountFields = userDetails.map((userDetail, index) => ({
        label: 'User ' + (index + 1),
        type: 'text',
        placeholder: 'Enter user details',
        name: userDetail.name,
        email: userDetail.email,
        // Add other fields here as needed
    }));

    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center playfair-display-mygooglefont">Welcome to Your Account</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5 className='playfair-display-mygooglefont'>Account Details</h5>
                                    <p className='lora-mygooglefont'>Email: {currentUser.email}</p>
                                    <p className='lora-mygooglefont'>Name: {currentUser.name}</p>
                                    <p className='lora-mygooglefont'>Password: {currentUser.password}</p>
                                    <p className='lora-mygooglefont'>UserId: {currentUser.id}</p>
                                    <Button variant="primary" onClick={editAccount}>Edit Account</Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5 className='playfair-display-mygooglefont'> Placed Orders</h5>
                                    <Button variant="secondary" onClick={viewPlacedOrders}>View Orders</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <CommonModal show={showModal} handleClose={handleCloseModal} fields={accountFields} />
        </Container>
    );
};

export default Account;
