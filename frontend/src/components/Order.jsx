import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaBox, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

function Order() {
    const [orders, setOrders] = useState([])
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})
    const address = user?.address?.[0]

    // https://thredup-clone.onrender.com

    useEffect(() => {
        // axios.get("http://127.0.0.1:3001/manageOrders")

        axios.get(`https://thredup-clone.onrender.com/manageOrders/${userId}`)
            .then(orders => setOrders(orders.data))
            .catch(err => console.log(err))
    }, [userId])

    useEffect(() => {
        if (userId) {
          axios.get(`https://thredup-clone.onrender.com/manageUsers/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
        }
      }, [userId])

    const continueShopping = () => {
        navigate('/')
    }


    return (
        <>
            {orders.length === 0 ? (

                <div className="no-orders-page">
                    <div className="orders-container">

                        <div className="orders-header">
                            <h2>MY ORDERS</h2>
                        </div>

                        <hr />

                        <div className="empty-orders">
                            <div className="icon-box">
                                <FaBoxOpen size={50} />
                            </div>

                            <h3>No orders has been placed yet</h3>
                            <p>Add items into your cart to place an order</p>

                            <button className="shop-order-btn" onClick={continueShopping}>CONTINUE SHOPPING</button>
                        </div>

                    </div>
                </div>

            ) : (


                <div className="order-page" style={{display:'flex', backgroundColor:'#dae'}}>
                    {
                        orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order, index) => {
                            const date = new Date(order.orderDate)
                            const formattedOrderDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
                            return (
                                

                                <div className="order-container">

                                    <div className="order-header">
                                        <div>
                                            <h2>Order Summary</h2>
                                            <p>Order #<strong>ORD-{order._id.substr(20,)}  </strong> </p>
                                            <span>Placed on {formattedOrderDate}</span>
                                        </div>

                                        <div className="order-right">
                                           <p>Order status : <br />
                                            {order.orderStatus}</p>
                                        </div>
                                    </div>

                                    <div className="order-body">
                                        <h3 className="order-title-card" >
                                            {/* <FaBox className="order-icon-body" /> */}
                                            Order Items({order.products.length} items)</h3>
                                        <hr />

                                        <div className="order-product-card">
                                            <img src={order.products[0].productImage} alt="product" />

                                            <div className="order-product-details">
                                                <h4> {order.products[0].productName} </h4>
                                                <p>Color: {order.products[0].color} </p>
                                                <p>Size: {order.products[0].size} </p>
                                                <p>Quantity: {order.products[0].quantity} </p>
                                            </div>

                                            <button className="view-btn">View Details</button>
                                        </div>
                                    </div>

                                    <div className="bottom-grid">

                                        <div className="delivery-card">
                                            <h3 className="delivery-card-title">
                                                {/* <FaMapMarkerAlt className="delivery-icon" /> */}
                                                Delivery Address
                                            </h3>
                                            <hr />
                                            <p><strong>{user?.username}</strong></p>
                                            <p>{address?.location}</p>
                                            <p>{address?.city}</p>
                                            <p>{address?.state} - <strong>{address?.pincode}</strong> </p>
                                            <p>Phone: {user?.phonenumber}</p>
                                        </div>

                                        <div className="payment-card">
                                            <h3>
                                                {/* <FaCreditCard /> */}
                                                Payment Method</h3>
                                            <hr />
                                            <span className="success">{order.paymentMode}</span>

                                            <div className="order-price">
                                                Total:
                                                {order.finalTotal}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        }
                        )

                    }
                </div>
            )}
        </>
    );
}

export default Order;