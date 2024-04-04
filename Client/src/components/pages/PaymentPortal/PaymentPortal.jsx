import React from 'react';
import "./PaymentPortal.css"
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
// import { placeOrder } from '../../../utils/axios-instance';
// import { getOrderId } from '../../../redux/actions/actions';

const PaymentPortal = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const userObj = useSelector((state) => state.user.loginUserInfo)
    // const orderedBooks = useSelector((state) => state.cart.cart)
    // const amount = useSelector((state) => state.order.totalAmount)

    // console.log(userObj)
    // console.log(orderedBooks)
    // console.log(amount)


    const handlePayment = async (event) => {
        event.preventDefault();
        // const orderObj = {
        //   user_id: userObj.id,
        //   totalAmount: amount.toString(),
        //   ordered_at: new Date().toLocaleString(),
        //   books: orderedBooks.map(book => ({
        //     id: book.id,
        //     name: book.name,
        //     author: book.author,
        //     category: book.category,
        //     description: book.description,
        //     price: book.price,
        //     releaseDate: book.releaseDate,
        //     images: book.images
        //   }))
        // }
        // const response = await placeOrder(orderObj);
        // console.log(response)
        if (response.success) {
            const orderId = response.data.id
            dispatch(getOrderId(orderId))
            //   Swal.fire({
            //     title: "Order Placed!",
            //     text: "Your order has been successfully placed.",
            //     icon: "success"
            //   });
            navigate("/finalOrderPage");
        } else {
            console.log("Some error occurred at payment")
            //   Swal.fire({
            //     title: "Error",
            //     text: "There was an error placing your order.",
            //     icon: "error"
            //   });
        }
    }

    return (
        <div className="credit-card-form">
            <h2>PAYMENT PORTAL</h2>
            <img className="Image1" src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png" alt="Card mockup" border="0" />

            <form>
                <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="Card number" />
                </div>
                <div className="form-group">
                    <label htmlFor="card-holder">Card Holder</label>
                    <input type="text" id="card-holder" placeholder="Card holder's name" />
                </div>
                <div className="form-row">
                    <div className="form-group form-column">
                        <label htmlFor="expiry-date">Expiry Date</label>
                        <input type="text" id="expiry-date" placeholder="MM/YY" />
                    </div>
                    <div className="form-group form-column">
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="CVV" />
                    </div>
                </div>
                <button type="submit" className="click-button" onClick={handlePayment}>PAY NOW - ₹ {amount}</button>
            </form>
        </div>
    );
};

export default PaymentPortal;
