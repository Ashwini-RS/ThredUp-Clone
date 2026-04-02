// const nodemailer = require('nodemailer');
// require('dotenv').config()

// const sendMail = async(email, otp) => {
//     try {
//         //make transporter to send mail
//         const transporter = nodemailer.createTransport( {
//             service: "gmail",
//             auth: {
//                  user: process.env.email ,
//                 pass: process.env.pass
//             }
//         });

//         await transporter.sendMail( {
//             from: ' ashwinirathna2026@gmail.com',
//             to: `${email}`,
//             subject: 'OTP Verification Code for THREDUP Login',
//             html: `
//             <h3>Dear Customer</h3>
//             <p>You otp is ${otp}. This is valid only for 15 minutes.</p>
//             <h3>Thank You, Team THREDUP</h3>
//             `
//         });
//     }
//     catch(error) {
//         console.log("Send Mail error: ", error)
//     }
// }

// module.exports = sendMail; 


const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, otp) => {
  try {
    const msg = {
      to: `${email}`,
      from: process.env.user, // verified sender
      subject: 'OTP Verification Code for ThredUp Login',
      html: `
        <h3>Dear Customer</h3>
        <p>Your OTP is <b>${otp}</b>. This is valid for 15 minutes.</p>
        <h3>Thank You, Team Thredup</h3>
      `
    };

    await sgMail.send(msg);

    console.log("Mail sent successfully");

  } catch (error) {
    console.error("Send Mail error:", error);
    throw error;
  }
};

module.exports = sendMail;