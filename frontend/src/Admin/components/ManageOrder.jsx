import Adminsidebar from "./Adminsidebar";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

function ManageOrder() {
    const [orders, setOrders] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [user, setuser] = useState({})
    const [addresses, setAddresses] = useState({})

    // https://thredup-clone.onrender.com

    useEffect(() => {
        // axios.get("http://127.0.0.1:3001/manageOrders")

        axios.get("https://thredup-clone.onrender.com/manageOrders")
            .then(orders => setOrders(orders.data))
            .catch(err => console.log(err))
    }, [])

    const viewProducts = (products) => {
        setSelectedProducts(products)
        setShowModal(true)
    }

    useEffect(() => {
        orders.forEach((order) => {
            axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageOrderAddress/${order.userEmail}`)
                .then(res => {
                    setAddresses(prev => ({
                        ...prev,
                        [order.userEmail]: res.data.address[0]
                    }))
                })
                .catch(err => console.log(err))

        })
    }, [orders])

    const deleteOrders = async (id) => {
        try {
            // await axios.delete(`http://localhost:3001/deleteOrders/${id}`);

            await axios.delete(`https://thredup-clone.onrender.com/deleteOrders/${id}`);

            // setOrders(orders.filter(order => order._id !== id));

            alert("Order deleted successfully!");
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Could not delete the order. Please try again.");
            window.location.reload();
        }

        // axios.delete(`http://127.0.0.1:3001/deleteOrders/${id}`)
        // alert("Orders Deleted")
        // window.location.reload();
    }

    return (
        <>
            <Adminsidebar />
            <div className="admin-order">
                <h3>MANAGE ORDERS</h3>
                <table className="orders-table">

                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>User Email</th>
                            <th>User Address</th>
                            <th>Ordered Date</th>
                            <th>Product Details</th>
                            <th>Total Amount</th>
                            <th>Payment Mode</th>
                            <th>Payment Status</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => {
                            const date = new Date(order.orderDate)
                            const formattedOrderDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
                            return <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{addresses[order.userEmail]?.location} </td>
                                <td>{formattedOrderDate}</td>
                                <td className='click' onClick={() => {
                                    console.log(order.products);
                                    viewProducts(order.products);
                                }}>  View Products </td>
                                <td>{order.finalTotal}</td>
                                <td>{order.paymentMode}</td>
                                <td>{order.paymentStatus} </td>
                                <td>{order.orderStatus}</td>
                                <td className="order-btn">
                                    <Link to={`/admin/EditStatus/` + order._id}>Edit</Link>
                                    <button onClick={() => deleteOrders(order._id)}>
                                        Delete</button>
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="mod-order-details">

                    <h4> Ordered Products </h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                            {selectedProducts.map((product, index) => (
                                <tr key={index}>
                                    {/* <td><img src={`http://localhost:3001/${product.productImage}`} /></td> */}

                                    <td>
                                        <img src={` https://thredup-clone.onrender.com/${product.productImage}`} />
                                    </td>
                                    <td>{product.productName}</td>
                                    <td>{product.newprice}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                    <button className="close-btn" onClick={() => setShowModal(false)}>
                        X
                    </button>
                </div>
            )}

        </>
    );
}

export default ManageOrder;