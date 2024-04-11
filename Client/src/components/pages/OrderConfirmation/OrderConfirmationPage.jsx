import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { getOrderById } from '../../../utils/axios-instance';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { setLoader } from '../../../redux/actions/appAction';
import Loader from '../../common/Loader';
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"

const OrderConfirmationPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { loader } = useSelector((state) => state.app);
    const [data, setData] = useState(null);
    const OrderedBooks = data?.finalOrderBooks?.cart;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getOrderById(id);
                if (response.success) {
                    setData(response.data);
                    dispatch(setLoader(false))
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

    const downLoadPDF = () => {
        const capture = document.querySelector('.actual-receipt');
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('receipt.pdf');
        });
    };

    const navigateToHome = () => {
        navigate("/")
    }

    return (
        <>
            {loader && <Loader />}
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow">
                            <Card.Body className='actual-receipt'>
                                <h2 className="text-center mb-4 playfair-display-mygooglefont">Thank You for Placing Your Order!</h2>
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

                                <h4 className="mt-4">Total Amount: ₹{data?.finalOrderBooks?.totalAmount}</h4>

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
                                                    <Card.Text><strong>Price:</strong> ₹{book.price}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <div className="d-flex justify-content-center">
                        <Button variant="success" className="rounded-pill mr-3" onClick={downLoadPDF}>Download Invoice</Button>
                        <Button variant="primary" className="rounded-pill" onClick={navigateToHome}>Continue Shopping</Button>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default OrderConfirmationPage;
