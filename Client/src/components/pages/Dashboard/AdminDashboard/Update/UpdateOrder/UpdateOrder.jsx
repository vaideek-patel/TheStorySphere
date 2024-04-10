import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { getOrderById } from '../../../../../../utils/axios-instance';
import { Container, Row, Col, Button } from 'react-bootstrap';

const UpdateOrder = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const fetchData = await getOrderById(orderId);
                console.log(fetchData.data)
                setOrderData(fetchData.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrderData();
    }, [orderId]);

    const orderSchema = {
        orderData
    }
    console.log(orderSchema)

    return (
        <Container>
            <h2 className="my-4">Update Order</h2>
            <Formik
                initialValues={orderData || { orderId: '', userId: '', totalAmount: '', placedAt: '' }}
                onSubmit={(values) => {
                    console.log(values);
                    // Add logic to update order here
                }}
            >
                <Form>
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="orderId">Order ID</label>
                            <Field id="orderId" name="orderId" className="form-control" disabled />
                        </Col>
                        <Col>
                            <label htmlFor="userId">User ID</label>
                            <Field id="userId" name="userId" className="form-control" disabled />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="totalAmount">Total Amount</label>
                            <Field id="totalAmount" name="totalAmount" className="form-control" />
                        </Col>
                        <Col>
                            <label htmlFor="placedAt">Placed At</label>
                            <Field id="placedAt" name="placedAt" type="date" className="form-control" />
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="primary" type="submit">Update</Button>
                    </div>
                </Form>
            </Formik>
        </Container>
    );
};

export default UpdateOrder;
