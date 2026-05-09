import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OtpForm({ email }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
    setErrorMessage("");
  };

  useEffect(() => {
    if (timer === 0) {
      setShowResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setErrorMessage("OTP must be 6 digits");
      return;
    }

    try {
      const response = await axios.post(
        "https://thredup-clone.onrender.com/login/verifyOtp",
        {
          email: email,
          otp: code
        }
      );

      const userId = response.data.userId
      localStorage.setItem("userId", userId)
      alert("OTP Verified Successfully");
      navigate('/')

    } catch (error) {

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  const handleResend = async () => {

    try {
      await axios.post(
        "https://thredup-clone.onrender.com/login/sendOtp",
        { email }
      );

      setTimer(30);
      setShowResend(false);
      setCode("");
      setErrorMessage("");

    } catch (error) {
      setErrorMessage("Failed to resend OTP");
    }
  };

  return (

    <form className="otp-hero" onSubmit={handleSubmit}>

      <div className="verify-box">

        <h1>Verify Your Email</h1>
        <p>Enter the code we sent to you to login to your account.</p>

        <input
          type="text"
          placeholder="Code*"
          className="code-input"
          value={code}
          onChange={handleChange}
          maxLength={6}
        />

        {errorMessage && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}

        <br />

        <button type="submit" className="otp-primary-btn">
          START SHOPPING
        </button>

        <br /><br />

        {!showResend ? (
          <p>Resend OTP in {timer} seconds</p>
        ) : (
          <button
            type="button"
            className="otp-link-btn"
            onClick={handleResend}
          >
            RESEND CODE
          </button>
        )}

      </div>

    </form>
  );
}

export default OtpForm;