import React, { useEffect, useState } from "react";
import { deleteOrderById, getOrders } from "../../../../../../utils/axios-instance";
import { useNavigate } from 'react-router-dom';
import { Container, Button } from "react-bootstrap";

const ManageOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                console.log(response.data)
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    const DeleteorderData = async (orderId) => {
        const deleteOrder = await deleteOrderById(orderId)
        if (deleteOrder.success) {
            console.log("Order Deleted!")
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        }
    }

    const ordersArray = [
        { key: "id", label: "OrderId" },
        { key: "userId", label: "BuyerId" },
        { key: "totalAmount", label: "TotalAmount", getValue: (item) => item.finalOrderBooks ? item.finalOrderBooks.totalAmount : '' },
    ];

    const viewOrder = (id) => {
        navigate(`/admin/viewOrder/${id}`)
    }

    return (
        <Container className="py-4">
            <h2 className='playfair-display-mygooglefont mb-3'>Manage Orders here!</h2>
            {orders.length === 0 ? (
                <h4 className='playfair-display-mygooglefont mb-3'>No orders currently placed.</h4>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                {ordersArray.map((header, index) => (
                                    <th key={index} scope="col">{header.label}</th>
                                ))}
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                    <td>{index + 1}</td>
                                    {ordersArray.map((header, index) => (
                                        <td key={index}>{header.key === 'totalAmount' ? header.getValue(item) : item[header.key]}</td>
                                    ))}
                                    <td className="d-flex justify-content-center align-items-center gap-2">
                                        <Button onClick={() => viewOrder(item.id)} variant="primary" size="sm">View</Button>
                                        <Button onClick={() => DeleteorderData(item.id)} variant="danger" size="sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Container>
    );
}

export default ManageOrders;
