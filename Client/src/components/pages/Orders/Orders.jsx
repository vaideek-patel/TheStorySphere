import React, { useEffect, useState } from 'react';
import { deleteOrderById, getOrders } from '../../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import DetailModal from '../../common/Modal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderedBooks, setOrderedBooks] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = useSelector((state) => state.role.user.id);

  const handleOrderDelete = async (orderId) => {
    const deleteOrder = await deleteOrderById(orderId)
    if (deleteOrder.success) {
      console.log("Order Deleted!")
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
  }

  const handleViewOrderedBooks = async (order) => {
    try {
      // const booksIds = order.finalOrderBooks.books.map(book => book.bookId);
      console.log(order.finalOrderBooks.cart)
      setOrderedBooks(order.finalOrderBooks.cart);
      // setSelectedOrder(order);
      setShowModal(true);
    } catch (error) {
      console.error("Error while fetching ordered books:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getOrders();
        if (success) {
          const filteredOrders = data.filter(order => order.userId === userId);
          setOrders(filteredOrders);
        } else {
          console.error("Failed to fetch users:", error);
        }
      } catch (error) {
        console.error("Error while fetching users:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <div className="container mt-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="mb-3">
              <Card.Body>
                <Card.Title>Order ID: {order.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Ordered at: {order.ordered_at}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Total Amount:</b> {order.finalOrderBooks.totalAmount}</ListGroup.Item>
                  <ListGroup.Item><b>User ID:</b> {order.userId}</ListGroup.Item>
                </ListGroup>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" style={{ marginRight: '8px' }} onClick={() => handleViewOrderedBooks(order)}>View ordered books</Button>
                  <Button variant="danger" onClick={() => handleOrderDelete(order.id)}>Delete order</Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h2>You have not placed any order yet.</h2>
        )}
      </div>
      <DetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        // quickViewBook={orderedBooks}
        data={orderedBooks}
      />
    </>
  );
};

export default Orders;
