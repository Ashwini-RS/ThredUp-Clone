const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    products: [
        {
            productImage: String,
            productName: String,
            newprice: Number,
            quantity: Number
        }
    ],
   finalTotal: {
        type: Number
    },
    paymentMode:{
        type: String,
    },
    paymentId:{
        type: String,
    },
    paymentStatus:{
        type: String,
        default: 'pending'
    },
    orderStatus: {
        type: String,
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', OrderSchema)
module.exports = Order