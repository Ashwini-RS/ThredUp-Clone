const mongoose =  require("mongoose");

const ContactSchema = new mongoose.Schema({
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        fullname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phoneNumber:{
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        createdAt:{
                type: Date,
                default: Date.now
        }

});
const Contact = new .model("contacts", ContactSchema);
module.exports = Contact