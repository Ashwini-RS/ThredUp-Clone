import React from "react";
import { useState, useEffect } from 'react';
import { FaCrosshairs } from "react-icons/fa";

function EditAddress() {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    username: "",
    phonenumber: "",
    address: {
      pincode: "",
      location: "",
      city: "",
      state: ""
    }
  })

  useEffect(() => {
    if (userId) {
      axios.get(`https://thredup-clone.onrender.com/userData/${userId}`)
        .then(res => setUser({
          username: res.data.username || "",
          phonenumber: res.data.phonenumber || "",
          address: {
            pincode: res.data.address?.[0]?.pincode || "",
            location: res.data.address?.[0]?.location || "",
            city: res.data.address?.[0]?.city || "",
            state: res.data.address?.[0]?.state || ""
          }
        }))
        .catch(err => console.log(err))
    }

  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://purplle-ecommerce-clone-backend.onrender.com/profile/myaddress/${userId}`, {
        username: user.username,
        phonenumber: user.phonenumber,
        pincode: user.address.pincode,
        city: user.address.city,
        state: user.address.state,
        location: user.address.location
      });

      alert("Address Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-address-page">
      <div className="edit-address-card">

        <h3 className="edit-address-title">EDIT ADDRESS</h3>

        {/* <button className="location-btn">
          <FaCrosshairs /> Use my current location
        </button> */}
        <form action=" " onSubmit={handleSubmit}>
          <div className="address-form-grid">

            <input type="text" value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })} required />

            <input type="text" value={user.phonenumber}
              onChange={(e) => setUser({ ...user, phonenumber: e.target.value })} required />

            <input type="text" value={user.address.pincode}
              onChange={(e) => setUser({ ...user, address: { ...user.address, pincode: e.target.value } })} required />

            <textarea value={user.address.city}
              onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })} required />

            <input type="text" value={user.address.location}
              onChange={(e) => setUser({ ...user, address: { ...user.address, location: e.target.value } })} required />

            <input type="text" value={user.address.state}
              onChange={(e) => setUser({ ...user, address: { ...user.address, state: e.target.value } })} required />


            {/* <input type="text" value="9663631912" /> */}

          </div>

          <div className="address-actions">
            <button className="update-address-btn">UPDATE</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default EditAddress;