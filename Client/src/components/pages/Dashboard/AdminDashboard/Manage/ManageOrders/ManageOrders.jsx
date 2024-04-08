import { useEffect, useState } from "react"
import { getOrders } from "../../../../../../utils/axios-instance";
import Table from "../../../../../common/Table";
// import { getAllBooks } from "../../../../../../utils/axios-instance";
// import Table from "../../../../../common/Table";

const ManageOrders = () => {
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
                console.log(response.data)
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);
    return (
        <>
            <div>
                Manage Category here!
            </div>
            <Table data={orders} headers={ordersArray} />
        </>
    )
}

export default ManageOrders


