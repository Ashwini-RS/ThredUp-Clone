import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

function Address() {
    return (
        <>
            <div className="page-wrapper">
                <div className="myaddress-container">
                    <h2 className="myaddress-title">Manage Addresses</h2>

                    <div className="myadd-box">
                        <FaPlus className="plus-icon" />
                        <span>ADD A NEW ADDRESS</span>
                    </div>

                    <div className="address-card">
                        <div className="card-top">
                            <span className="home-badge">HOME</span>
                            <FaEllipsisV className="menu-icon" />
                        </div>

                        <div className="user-details">
                            <span className="name">Ashwini</span>
                            <span className="phone">8618380092</span>
                        </div>

                        <p className="address-text">
                            Ganesh Nilaya, Kapikad, MG Road, Mangaluru, Dakshina Kannada,
                            Karnataka - 575006
                        </p>
                    </div>

                    <div className="address-card">
                        <div className="card-top">
                            <span className="home-badge">HOME</span>
                            <FaEllipsisV className="menu-icon" />
                        </div>

                        <div className="user-details">
                            <span className="name">Ashwini</span>
                            <span className="phone">8618380092</span>
                        </div>

                        <p className="address-text">
                            Ganesh Nilaya, Kapikad, MG Road, Mangaluru, Dakshina Kannada,
                            Karnataka - 575006
                        </p>
                    </div>
                </div>
            </div>


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
        </>
    );
}
export default Address;