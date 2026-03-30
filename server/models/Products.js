const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },

    productName: {
        type: String,
    },

    brand: {
        type: String,
    },

    productDescription: {
        type: String,
    },

    size: {
        type: String,
    },

    color: {
        type: String,
    },

    quantity: {
        type: String,
    },

    oldprice: {
        type: Number,
    },

    newprice: {
        type: Number,
    },

    discount: {
        type: Number,
    },

    category: {
        type: String,
    },
});

const Products = mongoose.model('products', ProductsSchema)
module.exports = Products