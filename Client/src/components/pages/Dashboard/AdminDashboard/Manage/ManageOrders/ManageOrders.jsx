import { useEffect, useState } from "react"
import { getOrders } from "../../../../../../utils/axios-instance";
import Table from "../../../../../common/Table";
import { useNavigate } from 'react-router-dom'
// import { getAllBooks } from "../../../../../../utils/axios-instance";
// import Table from "../../../../../common/Table";
import {Container} from "react-bootstrap"

const ManageOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    console.log(orders)

    const ordersArray = [
        { key: "id", label: "OrderId" },
        { key: "userId", label: "BuyerId" },
    ]

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    const UpdateOrderData = (orderId) => {
        navigate(`/admin/updateOrders/${orderId}`)
    }

    const DeleteorderData = (orderId) => {
        console.log(orderId)
    }




    return (
        <>
            <Container className="py-4">

                <h2 className='playfair-display-mygooglefont'>
                    Manage Orders here!
                </h2>
                <Table data={orders} headers={ordersArray} handleUpdate={UpdateOrderData} handleDelete={DeleteorderData} />
            </Container>

        </>
    )
}

export default ManageOrders


