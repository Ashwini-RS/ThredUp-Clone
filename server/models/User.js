const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },

    otp: {
        type: String,
        required: true,
        trim: true
    },

    otpExpiry: {
        type: Date,
        default: Date.now()
    },
    
    isVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('users', UserSchema)
module.exports = User