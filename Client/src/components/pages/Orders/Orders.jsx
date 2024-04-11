import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import DetailModal from '../../common/Modal';
import { setLoader } from '../../../redux/actions/appAction';
import Loader from '../../common/Loader';
import { useDispatch } from "react-redux"

const Orders = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.app);

  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderedBooks, setOrderedBooks] = useState([]);
  const userId = useSelector((state) => state.role.user.id);

  const handleViewOrderedBooks = async (order) => {
    try {
      dispatch(setLoader(true))
      console.log(order.finalOrderBooks.cart)
      setOrderedBooks(order.finalOrderBooks.cart);
      setShowModal(true);
      dispatch(setLoader(false))
    } catch (error) {
      console.error("Error while fetching ordered books:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoader(true))
        const { success, data, error } = await getOrders();
        if (success) {
          const filteredOrders = data.filter(order => order.userId === userId);
          setOrders(filteredOrders);
          dispatch(setLoader(false))
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
      {loader && <Loader />}
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
        data={orderedBooks}
      />
    </>
  );
};

export default Orders;
