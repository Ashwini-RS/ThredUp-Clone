const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const OrderDeliveredMail = async (email) => {
  try {
    const msg = {
      to: email,
      from: process.env.user, 
      subject: 'Your order has been Delivered',
      html: `
        <h3>Dear Customer</h3>
        <p>
          We’re happy to inform you that your order has been delivered successfully.
          We hope you love your purchase. Thank you for choosing us!
        </p>
        <h3>Thank you for shopping with us. Team ThredUp</h3>
      `
    };

    await sgMail.send(msg);

    console.log("Order Delivered mail sent successfully");

  } catch (error) {
    console.error("Send Mail error:", error);
    throw error;
  }
};

module.exports = OrderDeliveredMail;





// const nodemailer = require('nodemailer');

// const OrderDeliveredMail = async(email) => {
//     try {
//         const transporter = nodemailer.createTransport( {
//             service: "gmail",
//             auth: {
//                 user: "ashwinirathna2026@gmail.com",
//                 pass: 'hxttophiuifbrxgb'
//             }
//         });

//         await transporter.sendMail( {
//             from: 'ThredUp - OTP verification',
//             to: `${email}`,
//             subject: 'Your order is out for delivery',
//             html: `
//             <h3>Dear Customer</h3>
//             <p>We’re happy to inform you that your order has been delivered successfully. 
//             We hope you love your purchase. Thank you for choosing us!</p>
//             <h3>Thank you for shopping with us. Team ThredUp</h3>
//             `
//         });
//     }
//     catch(error) {
//         console.log("Send Mail error: ", error)
//     }
// }

// module.exports = OrderDeliveredMail; 