import { FaUser } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

function EditProfile() {
    return (
        <>
            <div className="edit-profile-container">

                <div className="edit-profile-wrapper">

                    <h2 className="edit-title">EDIT PROFILE</h2>
                    <hr />

                    <div className="edit-profile-card">
                        <div className="profile-left">
                            <div className="edit-avatar">
                                <FaUser size={40} />
                            </div>
                        </div>

                        <div className="profile-right">

                            <div className="edit-profile-section">
                                <div className="edit-section-header">
                                    <h3>BASIC INFORMATION</h3>
                                </div>

                                <div className="edit-info-row">
                                    <span>Full Name</span>
                                    <p>ash</p>
                                </div>

                                <div className="edit-info-row">
                                    <span>Email</span>
                                    <p>ashwinirathna9845@gmail.com</p>
                                </div>

                            </div>

                            <hr />

                            <div className="edit-profile-section">

                                <div className="edit-section-header">
                                    <h3>CONTACT INFORMATION</h3>
                                </div>

                                <div className="edit-info-row">

                                    <span>Mobile Number</span>
                                    <div className="row-end">
                                        <p>+91 8618380092</p>
                                    </div>
                                </div>

                            </div>

                            <hr />

                            <p className="update-profile">UPDATE</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default EditProfile;