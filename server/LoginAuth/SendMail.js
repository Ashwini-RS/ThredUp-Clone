const nodemailer = require('nodemailer');
require('dotenv').config()

const sendMail = async(email, otp) => {
    try {
        //make transporter to send mail
        const transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                 user: process.env.email ,
                pass: process.env.pass
            }
        });

        await transporter.sendMail( {
            from: ' ashwinirathna2026@gmail.com',
            to: `${email}`,
            subject: 'OTP Verification Code for THREDUP Login',
            html: `
            <h3>Dear Customer</h3>
            <p>You otp is ${otp}. This is valid only for 15 minutes.</p>
            <h3>Thank You, Team THREDUP</h3>
            `
        });
    }
    catch(error) {
        console.log("Send Mail error: ", error)
    }
}

module.exports = sendMail; 
