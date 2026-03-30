const nodemailer = require('nodemailer');

const OrderProcessingMail = async(email) => {
    try {
        const transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                user: "ashwinirathna2026@gmail.com",
                pass: 'hxttophiuifbrxgb'
            }
        });

        await transporter.sendMail( {
            from: 'ThredUp - OTP Verification',
            to: `${email}`,
            subject: 'We are processing your order',
            html: `
            <h3>Dear Customer</h3>
            <p>Order confirmed!  
            Thank you for shopping with us! 
            Your order is being processed, and we’ll notify you as soon as it’s on the way.</p>
            <h3>Thank You, Team ThredUp</h3>`
        });
    }
    catch(error) {
        console.log("Send Mail error: ", error)
    }
}

module.exports = OrderProcessingMail; 
