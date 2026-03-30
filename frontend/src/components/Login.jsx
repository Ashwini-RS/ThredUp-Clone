import React, { useState } from "react";
import axios from "axios";
import OtpForm from "./OtpForm";

function Login() {

  const [email, setEmail] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:3001/login/sendOtp",
     { email });

      setShowOtpForm(true);
      
    } catch (error) {
      console.log("Error sending OTP:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login">
      {!showOtpForm ? (
        <form onSubmit={handleSubmit}>
          <h2>THREDUP</h2>
          <h3>CREATE YOUR ACCOUNT</h3>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <button type="submit" className="buttonlogin">
            CONTINUE WITH EMAIL
          </button>

          <br /><br />

          <p>
            By continuing I agree to the
            <a href="#"><u> Terms</u></a> &{" "}
            <a href="#"><u>Privacy Policy</u></a>
          </p>
        </form>
      ) : (
        <OtpForm email={email}
        />
      )}
    </div>
  );
}

export default Login;