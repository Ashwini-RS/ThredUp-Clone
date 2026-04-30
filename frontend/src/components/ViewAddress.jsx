import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

function ViewAddress() {
    // const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})
    const address = user?.address?.[0]

    useEffect(() => {
        if (userId) {
            axios.get(`https://thredup-clone.onrender.com/manageUsers/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
        }
    }, [userId])

    return (
        <>
            <div className="view-address-page">
                <div className="myaddress-card">
                    <h2 className="myaddress-title">Manage Addresses</h2>

                    {address?.pincode ? (

                        < div className="address-card">

                            <div className="card-top">
                                {/* <span className="home-badge">HOME</span> */}
                                {/* <FaEllipsisV className="menu-icon" /> */}
                                <button>Edit </button>
                            </div>

                            <div className="user-details">
                                <span className="name">{user?.username}</span>
                                <span className="phone">{user?.phonenumber} </span>
                            </div>

                            <p className="address-text">
                                {address.location}, {address.city}, {address.state} <strong>{address.pincode} </strong>
                            </p>
                        </div>
                    ) : (
                        <div className="no-address-container">
                            <h2 className="no-address-title">MY ADDRESSES</h2>
                            <hr className="myaddresses-line" />

                            <div className="empty-address">

                                <div className="icon-box">
                                    <FaMapMarkerAlt size={40} />
                                </div>

                                <h3>No Address added yet</h3>
                                <p>
                                    Click “Add Address” button below to add your delivery address
                                </p>

                                <button className="myadd-btn">Add New Address</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default ViewAddress;