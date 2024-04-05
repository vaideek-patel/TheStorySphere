import React, { useEffect, useState } from 'react';
import { deleteOrderById, getOrders } from '../../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.role.user.id);

  const handleOrderDelete = async (orderId) => {
    const deleteOrder = await deleteOrderById(orderId)
    if (deleteOrder.success) {
      console.log("Order Deleted!")
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
    //     setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this order again!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!"
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const deleteOrder = await deleteOrderById(orderId)
    //     setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    //     Swal.fire({
    //       title: "Deleted!",
    //       text: "Your file has been deleted.",
    //       icon: "success"
    //     });
    //   }
    // });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getOrders();
        if (success) {
          const filteredOrders = data.filter(order => order.userId === userId);
          console.log(filteredOrders);
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
                  <Button variant="primary" style={{ marginRight: '8px' }}>View ordered books</Button>
                  <Button variant="danger" onClick={() => handleOrderDelete(order.id)}>Delete order</Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h2>You have not placed any order yet.</h2>
        )}
      </div>
    </>
  );
};

export default Orders;
