const mongoose = require('mongoose');
const User = require('./order');
const Product = require('./product');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    creatorId : {
        type : Schema.Types.ObjectID,
        ref : 'user'
    },
    products : [
        {
            prodId : {
                type : Schem.Types.ObjectID,
                ref : 'product'
            },
            quantity : Number
        }
    ],
    totalPrice : Number,
    totalAmount : Number,
    status : String,
    address : String
}, {timestamps: true});

module.exports = mongoose.model('order', orderSchema);