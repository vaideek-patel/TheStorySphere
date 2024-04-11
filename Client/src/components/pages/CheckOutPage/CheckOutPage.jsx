import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Image, Button } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, finalOrderDetails } from '../../../redux/actions/dataAction';
import { placeOrder } from '../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finalOrderBooks = useSelector((state) => state.cart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const finalOrder = useSelector((state) => state.data.finalOrderDetails);
  const userId = useSelector((state) => state.role.user.id);

  const [isSaved, setIsSaved] = useState(false);
  const [paymentMethodSaved, setpaymentMethodSaved] = useState(false);

  // const [isShippingDetailsSaved, setIsShippingDetailsSaved] = useState(false);
  // const [isPaymentDetailsSaved, setIsPaymentDetailsSaved] = useState(false);


  const handleShippingAdress = (values) => {
    dispatch(finalOrderDetails(values));
    setIsSaved(true);
  };

  const handlePaymentDeatils = (values) => {
    dispatch(finalOrderDetails(values));
    setpaymentMethodSaved(true)
  };

  const placeFinalOrder = () => {
    if (isSaved && paymentMethodSaved) {

      let timerInterval;
      Swal.fire({
        title: "Verifying Payment",
        html: "Do not Click anywhere!",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then(async (result) => {
        const shippingDetails = finalOrder[0];
        const paymentDetails = finalOrder[1];
        const timestamp = new Date();

        const orderData = {
          userId,
          shippingDetails,
          paymentDetails,
          finalOrderBooks,
          ordered_At: timestamp
        };

        try {
          const response = await placeOrder(orderData);
          console.log('Order placed successfully:', response);
          dispatch(clearCart());
          navigate(`/confirmedOrder/${response.data.id}`);
        } catch (error) {
          console.error('Error placing order:', error);
        }
      });
    } else {
      toast.error("Please fill both shipping and payment details before placing the order.");
    }

  };

  const validateShippingAddress = values => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!values.shippingAddress) {
      errors.shippingAddress = 'Shipping Address is required';
    }
    if (!values.company) {
      errors.company = 'Company Name is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }
    if (!values.state) {
      errors.state = 'State is required';
    }
    if (!values.zip) {
      errors.zip = 'Zip is required';
    }

    return errors;
  };

  const validatePaymentDetails = values => {
    const errors = {};

    if (!values.cardNumber) {
      errors.cardNumber = 'Card Number is required';
    }
    if (!values.cardName) {
      errors.cardName = 'Card Name is required';
    }
    if (!values.cardExpiry) {
      errors.cardExpiry = 'Card Expiry is required';
    }
    if (!values.cvv) {
      errors.cvv = 'CVV is required';
    }

    return errors;
  };

  const SavedShippingAdressToast = () => {
    toast.success("Shipping Adress Saved!")
  }

  const SavedPaymentDetails = () => {
    toast.success("Payment Details Verified & Saved!")
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Col md={10}>
            <Card className="mb-4">
              <Card.Body>
                <h4 className='playfair-display-mygooglefont'>1). Shipping Address</h4>
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
                  validate={validateShippingAddress}
                  onSubmit={handleShippingAdress}
                >
                  {({ touched, errors }) => (
                    <FormikForm>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="firstName">
                            <Field type="text" name="firstName" className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`} placeholder="First Name" />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="lastName">
                            <Field type="text" name="lastName" className={`form-control ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`} placeholder="Last Name" />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="shippingAddress">
                        <Field type="text" name="shippingAddress" className={`form-control ${touched.shippingAddress && errors.shippingAddress ? 'is-invalid' : ''}`} placeholder="Shipping Address" />
                        <ErrorMessage name="shippingAddress" component="div" className="invalid-feedback" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="company">
                        <Field type="text" name="company" className={`form-control ${touched.company && errors.company ? 'is-invalid' : ''}`} placeholder="Company or Apt Details" />
                        <ErrorMessage name="company" component="div" className="invalid-feedback" />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="city">
                            <Field type="text" name="city" className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''}`} placeholder="City" />
                            <ErrorMessage name="city" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="state">
                            <Field type="text" name="state" className={`form-control ${touched.state && errors.state ? 'is-invalid' : ''}`} placeholder="State" />
                            <ErrorMessage name="state" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="zip">
                            <Field type="text" name="zip" className="form-control" placeholder="Zip" />
                            <ErrorMessage name="zip" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className='text-end'>
                          <Button type="submit" variant='danger' className='rounded-pill' onClick={SavedShippingAdressToast} disabled={isSaved}>{isSaved ? 'Saved' : 'SAVE & CONTINUE'}</Button>
                        </Col>
                      </Row>
                    </FormikForm>
                  )}

                </Formik>
              </Card.Body>
            </Card>
          </Col>
          <Col md={10}>
            <Card className="">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h4 className='playfair-display-mygooglefont'>2). Payment</h4>
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
                  validate={validatePaymentDetails}
                  onSubmit={handlePaymentDeatils}
                >
                  {({ touched, errors }) => (
                    <FormikForm>
                      <Form.Group className="mb-3" controlId="cardNumber">
                        <Field type="text" name="cardNumber" className={`form-control ${touched.cardNumber && errors.cardNumber ? 'is-invalid' : ''}`} placeholder="Card Number" />
                        <ErrorMessage name="cardNumber" component="div" className="invalid-feedback" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="cardName">
                        <Field type="text" name="cardName" className={`form-control ${touched.cardName && errors.cardName ? 'is-invalid' : ''}`} placeholder="Card Name" />
                        <ErrorMessage name="cardName" component="div" className="invalid-feedback" />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="cardExpiry">
                            <Field type="text" name="cardExpiry" className={`form-control ${touched.cardExpiry && errors.cardExpiry ? 'is-invalid' : ''}`} placeholder="MM/YY" />
                            <ErrorMessage name="cardExpiry" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="cvv">
                            <Field type="text" name="cvv" className={`form-control ${touched.cvv && errors.cvv ? 'is-invalid' : ''}`} placeholder="CVV" />
                            <ErrorMessage name="cvv" component="div" className="invalid-feedback" />
                          </Form.Group>
                        </Col>
                        <Col md={12} className='text-end'>
                          <Button type="submit" variant='danger' className='rounded-pill' onClick={SavedPaymentDetails} disabled={paymentMethodSaved} >{paymentMethodSaved ? 'SAVED PAYMENT METHOD' : 'CONFIRM PAYMENT METHOD'}</Button>

                        </Col>
                      </Row>
                    </FormikForm>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body >
              <h3 className='mb-3 playfair-display-mygooglefont'>Order Summary</h3>
              <h6 className='playfair-display-mygooglefont'>Apply a promo code (Optional)</h6>
              <Row className="mb-3">
                <Col>
                  <Form.Control type="text" placeholder="Enter promo code" />
                </Col>
                <Col xs="auto">
                  <Button variant="secondary">Apply</Button>
                </Col>
              </Row>
              <hr style={{ backgroundColor: '#333', height: '2px', marginBottom: '20px' }} />
              <h5 className='playfair-display-mygooglefont'>Order Summary</h5>
              <div className="mb-3">
                <p>Total: ₹{totalAmount}</p>
              </div>
              <Button variant="danger" className="rounded-pill" onClick={placeFinalOrder} disabled={!isSaved || !paymentMethodSaved}
              >Place Order</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOutPage;
