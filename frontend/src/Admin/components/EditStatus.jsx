import Adminsidebar from "./Adminsidebar"
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios'

// https://thredup-clone.onrender.com

function EditStatus() {

    const [orderStatus, setOrderStatus] = useState("")

    const navigate = useNavigate()

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // const response = await axios.put(`http://127.0.0.1:3001/updateOrderStatus/${id}`, {

            const response = await axios.put(`https://thredup-clone.onrender.com/updateOrderStatus/${id}`, {
                orderStatus
            });
            alert("Status Updated and mail sent");
            navigate("/Admin/ManageOrders");

        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    }

    return (
        <>
            <Adminsidebar />
            <div className="editproduct-section">
                <form className="edit-products edit-form" onSubmit={handleSubmit}>
                    <h3 className="edit-title">EDIT ORDER STATUS</h3>

                    <div className="edit-products-details">

                        <div className="edit-form-row">
                            <label>Order Status</label>
                            <select name="status"  onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus} required>
                                <option value="">Select Status</option>
                                <option value="Order Processing">Order Processing</option>
                                <option value="Order Delivered">Order Delivered</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit" className="admin-btn-editproducts">UPDATE</button>
                </form>
            </div>
        </>
    );
}

export default EditStatus;