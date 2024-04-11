import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommonModal from "./CommonModal"
import "../../../Global.css"
import { useSelector } from 'react-redux';
import { getAccountDetailByUsertId } from '../../../utils/axios-instance';
import { setLoader } from '../../../redux/actions/appAction';
import Loader from '../../common/Loader';
import {useDispatch} from "react-redux"

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { loader } = useSelector((state) => state.app);
    const currentUserId = useSelector((state) => state.role.user.id);
    const [userDetails, setUserDetails] = useState([]);


    useEffect(() => {

        const fetcUserData = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getAccountDetailByUsertId(currentUserId);
                console.log(response.data)
                setUserDetails(response.data[0]);
                dispatch(setLoader(false))
            } catch (error) {
                console.log(error);
            }
        }
        fetcUserData()
    }, []);

    const viewPlacedOrders = () => {
        navigate("/manage-orders");
    };

    const editAccount = async () => {
        navigate(`/edit-account/${currentUserId}`);
    };


    return (
        <>
        
        <Container>
        {loader && <Loader/>}
            <Row className="mt-5">
                <Col md={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center playfair-display-mygooglefont">Welcome to Your Account</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5 className='playfair-display-mygooglefont'>Account Details</h5>
                                    <p className='lora-mygooglefont'>Email: {userDetails.email}</p>
                                    <p className='lora-mygooglefont'>Name: {userDetails.name}</p>
                                    <p className='lora-mygooglefont'>Password: {userDetails.password}</p>
                                    <p className='lora-mygooglefont'>UserId: {userDetails.id}</p>
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
        </Container>
        </>
    );
};

export default Account;
