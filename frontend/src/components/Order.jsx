import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from 'axios'
import { FaCheckCircle, FaBox, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

function Order() {
    const [orders, setOrders] = useState([])
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})

    // https://thredup-clone.onrender.com

    useEffect(() => {
        // axios.get("http://127.0.0.1:3001/manageOrders")

        axios.get(`https://thredup-clone.onrender.com/manageOrders/${userId}`)
            .then(orders => setOrders(orders.data))
            .catch(err => console.log(err))
    }, [userId])

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

                            <button className="shop-order-btn">CONTINUE SHOPPING</button>
                        </div>

                    </div>
                </div>

            ) : (


                <div className="order-page">
                    <div className="order-container">

                        <div className="order-header">
                            <div>
                                <h2>Order Summary</h2>
                                <p>Order #ORD-2026-04-001234</p>
                                <span>Placed on April 23, 2026</span>
                            </div>

                            <div className="order-right">
                                Order status : <br />
                                Pending
                            </div>
                        </div>

                        <div className="order-body">
                            <h3 className="order-title-card" >
                                {/* <FaBox className="order-icon-body" /> */}
                                Order Items</h3>
                            <hr />

                            <div className="order-product-card">
                                <img src="/images/tadashi.webp" alt="product" />

                                <div className="order-product-details">
                                    <h4>Elegant Evening Dress</h4>
                                    <p>Color: Black</p>
                                    <p>Size: M</p>
                                    <p>Quantity: 1</p>
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
                                <p><strong>Sarah Johnson</strong></p>
                                <p>123 Fashion Avenue</p>
                                <p>Apartment 4B</p>
                                <p>New York, NY 10001</p>
                                <p>United States</p>
                                <p>Phone: (555) 123-4567</p>
                            </div>

                            <div className="payment-card">
                                <h3>
                                    {/* <FaCreditCard /> */}
                                    Payment Method</h3>
                                <hr />
                                <span className="success">COD</span>

                                <div className="order-price">
                                    Total:
                                    129.99
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default Order;