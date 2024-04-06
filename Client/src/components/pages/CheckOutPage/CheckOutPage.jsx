import React from 'react';
import { Container, Row, Col, Card, Form, Image, Button } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, finalOrderDetails } from '../../../redux/actions/dataAction';
import { placeOrder } from '../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  shippingAddress: Yup.string().required('Shipping Address is required'),
  company: Yup.string().required('Company Name is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().required('Zip is required'),
  cardNumber: Yup.string().required('Card Number is required'),
  cardName: Yup.string().required('Card Name is required'),
  cardExpiry: Yup.string().required('Card Expiry is required'),
  cvv: Yup.string().required('CVV is required'),
});


const CheckOutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const finalOrderBooks = useSelector((state) => state.cart)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const finalOrder = useSelector((state) => state.data.finalOrderDetails)
  const userId = useSelector((state) => state.role.user.id)
  const handleShippingAdress = (values) => {
    dispatch(finalOrderDetails(values))
  };

  const handlePaymentDeatils = (values) => {
    dispatch(finalOrderDetails(values))
  }

  const placeFinalOrder = async () => {
    console.log(finalOrder);
    const shippingDetails = finalOrder[0];
    const paymentDetails = finalOrder[1];

    const orderData = {
      userId,
      shippingDetails,
      paymentDetails,
      finalOrderBooks,
    };

    try {
      const response = await placeOrder(orderData);
      console.log('Order placed successfully:', response);
      dispatch(clearCart())
      navigate(`/confirmedOrder/${response.data.id}`)

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Col md={10}>
            <Card className="mb-4">
              <Card.Body>
                <h4>1). Shipping Address</h4>
                <hr style={{ backgroundColor: '#333', height: '2px', marginBottom: '20px' }} />
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    shippingAddress: '',
                    company: '',
                    city: '',
                    state: '',
                    zip: ''
                  }}
                  onSubmit={handleShippingAdress}
                >
                  {({ touched, errors }) => (
                    <FormikForm>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="firstName">
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Field type="text" name="firstName" className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`} placeholder="First Name" />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="lastName">
                            {/* <Form.Label>Last Name</Form.Label> */}
                            <Field type="text" name="lastName" className={`form-control ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`} placeholder="Last Name" />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="shippingAddress">
                        {/* <Form.Label>Shipping Address</Form.Label> */}
                        <Field type="text" name="shippingAddress" className={`form-control ${touched.shippingAddress && errors.shippingAddress ? 'is-invalid' : ''}`} placeholder="Shipping Address" />
                        <ErrorMessage name="shippingAddress" component="div" className="invalid-feedback" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="company">
                        {/* <Form.Label>Company or Apt Details</Form.Label> */}
                        <Field type="text" name="company" className={`form-control ${touched.company && errors.company ? 'is-invalid' : ''}`} placeholder="Company or Apt Details" />
                        <ErrorMessage name="company" component="div" className="invalid-feedback" />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="city">
                            {/* <Form.Label>City</Form.Label> */}
                            <Field type="text" name="city" className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''}`} placeholder="City" />
                            <ErrorMessage name="city" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="state">
                            {/* <Form.Label>State</Form.Label> */}
                            <Field type="text" name="state" className={`form-control ${touched.state && errors.state ? 'is-invalid' : ''}`} placeholder="State" />
                            <ErrorMessage name="state" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="zip">
                            {/* <Form.Label>Zip</Form.Label> */}
                            <Field type="text" name="zip" className="form-control" placeholder="Zip" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='text-end'>
                          <Button type="submit" variant='danger' className='rounded-pill'>SAVE & CONTINUE</Button>
                        </Col>
                      </Row>
                    </FormikForm>
                  )}

                </Formik>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h4>Expected delivery in 3-4 days</h4>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md={10}>
            <Card className="">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h4>2). Payment</h4>
                  </Col>
                  <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Image src="https://mini-assets-prod.storage.googleapis.com/secure_checkout_badge.png" alt="Payment" fluid />
                  </Col>
                  <hr style={{ backgroundColor: '#333', height: '2px', marginBottom: '20px' }} />
                </Row>
                <Formik
                  initialValues={{
                    cardNumber: '',
                    cardName: '',
                    cardExpiry: '',
                    cvv: ''
                  }}
                  onSubmit={handlePaymentDeatils}
                >
                  <FormikForm>
                    <Form.Group className="mb-3" controlId="cardNumber">
                      {/* <Form.Label>Card Number</Form.Label> */}
                      <Field type="text" name="cardNumber" className="form-control" placeholder="Card Number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cardName">
                      {/* <Form.Label>Card Name</Form.Label> */}
                      <Field type="text" name="cardName" className="form-control" placeholder="Card Name" />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="cardExpiry">
                          {/* <Form.Label>Card Expiry</Form.Label> */}
                          <Field type="text" name="cardExpiry" className="form-control" placeholder="MM/YY" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="cvv">
                          {/* <Form.Label>CVV</Form.Label> */}
                          <Field type="text" name="cvv" className="form-control" placeholder="CVV" />
                        </Form.Group>
                      </Col>
                      <Col md={12} className='text-end'>
                        <Button type="submit" variant='danger' className='rounded-pill'>CONFIRM PAYMENT METHOD</Button>
                      </Col>
                    </Row>
                  </FormikForm>
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              {/* Apply Promo Code Section */}
              <h3 className='mb-3'>Order Summary</h3>
              <h6>Apply a promo code (Optional)</h6>
              <Row className="mb-3">
                <Col>
                  <Form.Control type="text" placeholder="Enter promo code" />
                </Col>
                <Col xs="auto">
                  <Button variant="secondary">Apply</Button>
                </Col>
              </Row>
              <hr style={{ backgroundColor: '#333', height: '2px', marginBottom: '20px' }} />

              <h5>Order Summary</h5>
              <div className="mb-3">
                <p>Total: ${totalAmount}</p>
              </div>

              {/* Place Order Button */}
              <Button variant="danger" className="rounded-pill" onClick={placeFinalOrder}>Place Order</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOutPage;
