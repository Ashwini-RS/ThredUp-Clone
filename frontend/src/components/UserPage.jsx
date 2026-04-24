import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import { FaUser, FaBox, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

function UserPage() {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})
 {/* userEmail */}
    useEffect(() => {
        if (userId) {
          axios.get(`https://thredup-clone.onrender.com/userData/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
        }
      }, [userId])

    return (
        <>
       
            <div className="profile-container">

                <div className="profile-sidebar">
                    <div className="user-info">
                        <div className="avatar">
                            <FaUser size={30} />
                        </div>

                        <div className="user-text">
                            <h3>{user?.username}</h3>
                            <p>{user?.email}</p>
                        </div>
                    </div>

                    <div className="profile-menu">

                        <Link to="#" className="menu-item">
                            <FaUser className="menu-icon" />

                            <div className="user-menu-text">
                                <span className="menu-title">My Profile</span>
                                <p>All your personal details</p>
                            </div>
                        </Link>

                        <Link to="#" className="menu-item">
                            <FaBox className="menu-icon" />

                            <div className="user-menu-text">
                                <span className="menu-title">My Orders</span>
                                <p>All your confirmed orders</p>
                            </div>
                        </Link>

                        <Link to="#" className="menu-item">
                            <FaMapMarkerAlt className="menu-icon" />

                            <div className="user-menu-text">
                                <span className="menu-title">My Addresses</span>
                                <p>All your saved  addresses</p>
                            </div>
                        </Link>

                        <Link to="#" className="menu-item">
                            <FaUniversity className="menu-icon" />

                            <div className="user-menu-text">
                                <span className="menu-title"> My Bank Account</span>
                                <p>All your saved bank account</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="profile-content">
                    <h2>MY PROFILE</h2>

                    <div className="profile-card">

                        <div className="profile-icon">
                            <FaUser />
                        </div>

                        <div className="user-info-section">
                            <div className="profile-section">

                                <div className="profile-section-header">
                                    <h3>BASIC INFORMATION</h3>
                                    <Link to="/EditProfile">
                                        <span className="edit-link">Edit</span>
                                    </Link>
                                </div>

                                <p><strong>Full Name:</strong>{user?.username}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                            </div>

                            <div className="user-section-divider"></div>

                            <div className="profile-section">
                                <div className="profile-section-header">
                                    <h3>CONTACT INFORMATION</h3>
                                </div>

                                <h4>Mobile Number: {user?.phonenumber}</h4>
                            </div>

                            <div className="user-section-divider"></div>

                            <p className="logout-profile">Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPage;