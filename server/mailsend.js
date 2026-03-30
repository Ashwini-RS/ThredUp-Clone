const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        secure:true.valueOf,
        host:'smtp.gmail.com',
        port: 465,
        auth:{
            user: 'ashwinirathna2026@gmail.com',
            pass: 'hxttophiuifbrxgb'
        }
    }
)

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });

    console.log(("Email Sent"));
    
}

sendMail("ashwinirathna2026@gmail.com", "This is SUBJECT","This is Text Message")