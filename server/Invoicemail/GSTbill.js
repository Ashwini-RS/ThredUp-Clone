
const sgMail = require('@sendgrid/mail');
const {GSTpdf} = require('../Service/GSTpdf')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const GSTbill = async (email, orders, user) => {

    try {
        const pdfBuffer = await GSTpdf(orders, user)
        const msg = {
            to: `${email}`,
            from: process.env.user,
            subject: 'Your Order Confirmation ',
            html: `
            <h3>Dear Customer,</h3>
            <p>Good news! Your order has been delivery has been confirmed successfully. Your order details has been attached in this Email.  View attachment. Thank you for shopping with us!</p>
            <h3>Thank You, Team ThredUp</h3>
            `,

            text: 'Your Order is confirmed',
            attachments: [
                {
                    content: pdfBuffer.toString("base64"),
                    filename: "GSTInvoice.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                }
            ]
        };

        await sgMail.send(msg);

        console.log("Order Confirmed Email sent successfully");

    } catch (error) {
        console.error("Send Mail error:", error);
        throw error;
    }
};

module.exports = GSTbill;
