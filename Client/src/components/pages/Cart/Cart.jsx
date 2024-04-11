import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeBookFromCart, totalAmount } from '../../../redux/actions/dataAction';
import "../../../Global.css";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [finalBooks, setFinalBooks] = useState([]);
  const booksInCart = useSelector((state) => state.cart.cart);
  const subTotal = finalBooks.reduce((acc, book) => acc + parseFloat(book.price) * book.quantity, 0);
  const taxRate = subTotal > 2000 ? 0 : 150;
  const total = subTotal + taxRate;
  const remainingForFreeShipping = 2000 - subTotal;

  useEffect(() => {
    setFinalBooks(booksInCart.map(book => ({ ...book, quantity: 1 })));
  }, [booksInCart]);

  useEffect(() => {
    if (total > 2000) {
      toast.success('Wohoo, your shipping and taxes are waived off!');
    }
  }, [total]);

  const removeBook = (bookId) => {
    const updatedBooks = finalBooks.filter(book => book.id !== bookId);
    setFinalBooks(updatedBooks);
    dispatch(removeBookFromCart(bookId));
  };

  const handleCheckOut = () => {
    Swal.fire({
      title: `Complete Your Shopping Experience!`,
      text: "Proceed to Payment!",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Proceed For Payment",
      denyButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(totalAmount(total));
        console.log("true");
        navigate("/checkout");
      } else if (result.isDenied) {
        navigate("/books");
      }
    });
  };

  const handleDecrement = (bookId) => {
    setFinalBooks(finalBooks.map(book =>
      book.id === bookId ? { ...book, quantity: Math.max(book.quantity - 1, 1) } : book
    ));
  };

  const handleIncrement = (bookId) => {
    setFinalBooks(finalBooks.map(book =>
      book.id === bookId ? { ...book, quantity: book.quantity + 1 } : book
    ));
  };

  return (
    <div className="d-flex justify-content-center">
      <main id="cart" style={{ maxWidth: '960px' }}>
        <Container>
          <h1 className='playfair-display-mygooglefont'>Your Cart!</h1>
          {finalBooks.length > 0 ? (
            <Row>
              <Col xs={12} sm={8}>
                {finalBooks.map(book => (
                  <div key={book.id} className="cartItem">
                    <Row className="align-items-start">
                      <Col xs={3}>
                        <img src={book.image} alt="book" className="w-100" />
                      </Col>
                      <Col xs={5}>
                        <h6 className='playfair-display-mygooglefont'>{book.name}</h6>
                        <p className='lora-mygooglefont' style={{ color: 'blue', fontWeight: 'bold' }}>{book.author}</p>
                        <p>{book.releaseDate}</p>
                      </Col>
                      <Col xs={2}>
                        <div className="quantity-controls">
                          <Button variant="light" onClick={() => handleDecrement(book.id)}>-</Button>
                          <span className="quantity">{book.quantity}</span>
                          <Button variant="light" onClick={() => handleIncrement(book.id)}>+</Button>
                        </div>
                      </Col>
                      <Col xs={2}>
                        <p id="cartItem1Price">₹{book.price}</p>
                        <Button
                          onClick={() => removeBook(book.id)}
                          style={{
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Remove Book
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
              </Col>
              <Col xs={12} sm={4} className=" proceed form">
                <Card>
                  <Card.Body>
                    <h4 className='playfair-display-mygooglefont'>Order Summary!</h4>
                    <div className="row m-0">
                      <Col sm={8} className="p-0">
                        <h6>Subtotal</h6>
                      </Col>
                      <Col sm={4} className="p-0">
                        <p id="subtotal">₹{subTotal.toFixed(2)}</p>
                      </Col>
                    </div>
                    <div className="row m-0">
                      <Col sm={8} className="p-0">
                        <h6>Tax</h6>
                      </Col>
                      <Col sm={4} className="p-0">
                        <p id="tax">₹{taxRate.toFixed(2)}</p>
                      </Col>
                    </div>
                    <hr />
                    <div className="row mx-0 mb-2">
                      <Col sm={8} className="p-0">
                        <h5>Total</h5>
                      </Col>
                      <Col sm={4} className="p-0">
                        <p id="total">₹{total.toFixed(2)}</p>
                      </Col>
                    </div>
                    <div className="row mt-3">
                      <Col xs={12} className="text-center">
                        <Button variant="primary" onClick={handleCheckOut}>Checkout</Button>
                      </Col>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <div className="text-center">
              <p>You don't have any books in the cart.</p>
            </div>
          )}
        </Container>
      </main >
    </div>
  );
}

export default Cart;
