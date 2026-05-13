import React from 'react'
import { useState } from 'react';
import axios from 'axios'

function Contact() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [location, setLocation] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId")

    if (!userId) {
      alert("Please Login");
      return;
    }
    try {
      const res = await axios.post(
        "https://thredup-clone.onrender.com/contact",
        {
          userId,
          fullName,
          email,
          phoneNumber,
          location,
          message
        }
      );

      alert('Message Sent Successfully');

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setLocation("");
      setMessage("");

    }

    catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>

        <p className="main-text">
          You are here on the contact page of the second-hand platform.
        </p>

        {/* <p className="sub-text">
          For any questions regarding new items, our dedicated team can be
          reached here.
        </p> */}

        <p className="small-text">
          In order to better assist you, if your message concerns a specific
          article, please indicate its name and, if possible, its link or
          reference.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <input type="text"
              value={fullName}
              placeholder="Name"
              onChange={(e) => setFullName(e.target.value)}
              required />

            <input type="email"
              value={email}
              placeholder="Email *"
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>

          <input type="text"
            value={phoneNumber}
            placeholder="Phone Number"
            pattern='[0-9]{10}' maxLength={10}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required />

          <textarea placeholder="Comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)} required ></textarea>

          <input type="text" placeholder="Region" />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;