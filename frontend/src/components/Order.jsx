import React from "react";
import { FaBoxOpen } from "react-icons/fa";

function Order() {
    return (
        <>
            <div className="orders-page">
                <div className="orders-wrapper">

                    <h2 className="orders-title">MY ORDERS</h2>

                    <div className="order-card">
                        <div className="order-left">
                            <img src="images/athleta.webp" alt="product" />
                        </div>

                        <div className="order-center">
                            <h5>MYSORE SANDAL Soap Pure Sandalwood Oil 75g</h5>
                        </div>

                        <div className="order-price">
                            ₹237
                        </div>

                        <div className="order-right">
                            <p className="status cancelled">
                                ● Cancelled Today, Apr 17
                            </p>
                            <p className="message">
                                Your order was cancelled as per your request.
                            </p>
                        </div>
                    </div>

                    <div className="order-card">
                        <div className="order-left">
                            <img src="https://via.placeholder.com/80" alt="product" />
                        </div>

                        <div className="order-center">
                            <h5>Kilos Basket </h5>
                        </div>

                        <div className="order-price">
                            ₹356
                        </div>
                        <div className="order-right">
                            <p className="status delivered">
                                ● Delivered on Mar 12
                            </p>
                            <p className="message">
                                Your item has been delivered
                            </p>
                        </div>
                    </div>

                    <div className="order-card">
                        <div className="order-left">
                            <img src="https://via.placeholder.com/80" alt="product" />
                        </div>

                        <div className="order-center">
                            <h5>Portronics My Buddy J Wood Portable Laptop Table</h5>
                        </div>

                        <div className="order-price">
                            ₹566
                        </div>

                        <div className="order-right">
                            <p className="status delivered">
                                ● Delivered on Oct 19, 2025
                            </p>
                            <p className="message">
                                Your item has been delivered
                            </p>
                        </div>
                    </div>

                </div>
            </div>

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
        </>
    );
}

export default Order;