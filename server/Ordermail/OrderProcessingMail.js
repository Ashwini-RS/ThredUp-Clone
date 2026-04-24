const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const OrderProcessingMail = async (email) => {
  try {
    const msg = {
      to: email,
      from: process.env.user, 
      subject: 'We are processing your order',
      html: `
        <h3>Dear Customer</h3>
        <p>
          Order confirmed! <br/>
          Thank you for shopping with us! <br/>
          Your order is being processed, and we’ll notify you as soon as it’s on the way.
        </p>
        <h3>Thank You, Team ThredUp</h3>
      `
    };

    await sgMail.send(msg);

    console.log("Order Processing mail sent successfully");

  } catch (error) {
    console.error("Send Mail error:", error);
    throw error;
  }
};

module.exports = OrderProcessingMail;





// const nodemailer = require('nodemailer');

// const OrderProcessingMail = async(email) => {
//     try {
//         const transporter = nodemailer.createTransport( {
//             service: "gmail",
//             auth: {
//                 user: "ashwinirathna2026@gmail.com",
//                 pass: 'hxttophiuifbrxgb'
//             }
//         });

//         await transporter.sendMail( {
//             from: 'ThredUp - OTP Verification',
//             to: `${email}`,
//             subject: 'We are processing your order',
//             html: `
//             <h3>Dear Customer</h3>
//             <p>Order confirmed!  
//             Thank you for shopping with us! 
//             Your order is being processed, and we’ll notify you as soon as it’s on the way.</p>
//             <h3>Thank You, Team ThredUp</h3>`
//         });
//     }
//     catch(error) {
//         console.log("Send Mail error: ", error)
//     }
// }

// module.exports = OrderProcessingMail; 
