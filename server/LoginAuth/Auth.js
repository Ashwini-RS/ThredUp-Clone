const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sendMail = require('./SendMail');
const otpGenerator = require('otp-generator');

router.post('/sendOtp', async (req, res) => {
    try {

        const { email } = req.body;

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            digits: true
        });

        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

        let user = await User.findOne({ email });
        if (user) {
            if (!user.username) {
                user.username = "User"
            }

            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
        }
        else {
            // user = await User.create( {
            //     email, otp, otpExpiry
            // });
            user = new User({
                email,
                otp,
                phonenumber: null,

                otpExpiry
            });

            await user.save();
            // console.log("Saved user:", user);
        }

        await sendMail(email, otp);

        res.json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.log("Error is ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in sending otp'
        })
    }
});

//otp verification
router.post("/verifyOtp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ message: "OTP Does Not Match" })
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP Expired" })
        }

        user.isVerified = true;

        await user.save();

        return res.status(200).json({message: "OTP verified successfully", userId:user._id})
    }
    catch (error) {
        console.log("Error is ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in sending otp'
        })
    }
})

module.exports = router;



