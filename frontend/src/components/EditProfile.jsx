import { FaUser } from "react-icons/fa";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

function EditProfile() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({
        username: "",
        email: "",
        phonenumber: ""
    })

    useEffect(() => {
        if (userId) {
            axios.get(`https://thredup-clone.onrender.com/userData/${userId}`)
                .then(res => setUser({
                    username: res.data.username || "",
                    email: res.data.email || "",
                    phonenumber: res.data.phonenumber || ""
                }))
                .catch(err => console.log(err))
        }
    }, [userId])


    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`https://thredup-clone.onrender.com/editProfile/${userId}`, {
                username: user.username,
                phonenumber: user.phonenumber
            });

            alert("Profile Updated!!!!!");
            navigate("/UserPage");

        } catch (err) {
            console.error(err);
            alert("Failed to update user");
        }
    }

    return (
        <>
            <div className="edit-profile-container">

                <div className="edit-profile-wrapper">

                    <h2 className="edit-title">EDIT PROFILE</h2>
                    <hr />

                    <form action="" onSubmit={updateProfile}>
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
                                        <input type="text"
                                            id="username"
                                            value={user?.username}
                                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        />
                                    </div>

                                    <div className="edit-info-row">
                                        <span>Email</span>
                                        <input type="text" name="Email"
                                            id="email" value={user?.email}
                                            readOnly />
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
                                            <input type="tel"
                                                pattern='[0-9]{10}' maxLength={10} name="phonenumber"
                                                id="phonenumber" value={user.phonenumber}
                                                onChange={(e) => setUser({ ...user, phonenumber: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <hr />

                                <button className="update-profile" type='submit'>UPDATE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default EditProfile;