import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

function Address() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");

    const [pincode, setPincode] = useState("")
    const [location, setLocation] = useState(" ")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const [user, setUser] = useState({
        username: "",
        phonenumber: ""
    })

    useEffect(() => {
        if (userId) {
            axios.get(`https://thredup-clone.onrender.com/userData/${userId}`)
                .then(res => setUser({
                    username: res.data.username || "",
                    phonenumber: res.data.phonenumber || ""
                }))
                .catch(err => console.log(err))
        }
    }, [userId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(
                `https://thredup-clone.onrender.com/profile/myaddress/${userId}`,
                {
                    pincode,
                    location,
                    city,
                    state,
                    username: user.username,
                    phonenumber: user.phonenumber
                }
            )

            console.log(response.data)
            alert("Address added successfully !!")
            navigate('/AddToCart', { state: { openPayment: true } })

            setPincode("")
            setLocation("")
            setCity("")
            setState("")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="new-address-page">
                <div className="new-address-card">

                    <h3 className="add-title">ADD A NEW ADDRESS</h3>

                    <form action="" onSubmit={handleSubmit} >
                        <div className="new-address-form-grid">

                            <input type="text" placeholder="Name" value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })} required />

                            <input type="text" placeholder="10-digit mobile number" value={user.phonenumber}
                                onChange={(e) => setUser({ ...user, phonenumber: e.target.value })} required />

                            <textarea placeholder="Address (Area and Street)" value={location}
                                onChange={(e) => setLocation(e.target.value)} required />

                            <input type="text" placeholder="Town/City/District/" value={city}
                                onChange={(e) => setCity(e.target.value)} required />

                            <select value={state}
                                onChange={(e) => setState(e.target.value)} required>
                                <option>Select State</option>
                                <option>Karnataka</option>
                                <option>Tamil Nadu</option>
                                <option>Kerala</option>
                            </select>

                            <input type="text" placeholder="Pincode" value={pincode}
                                onChange={(e) => setPincode(e.target.value)} required />

                        </div>

                        <div className="new-add-actions">
                            <button className="save-add-btn" type="submit">SAVE NEW ADDRESS</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Address;