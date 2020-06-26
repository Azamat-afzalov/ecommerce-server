const mongoose = require('mongoose');
const Order require('./order');
const Cart = require('./cart');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname : {
        firstName : String,
        lastName: String
    },
    telephone : {
        countryCode : {
            type: Number,
            required : true
        },
        companyCode : {
            type: Number,
            required : true 
        },
        telephoneNumber : {
            type: Number,
            required : true 
        }
    },
    password : {
        type : String,
        required : true 
    },
    address : String,
    region : Number,
    orders : [
        {
            orderId : Schema.Types.ObjectID,
            ref : 'order'
        }
    ],
    cart : {
        type :Schema.Types.ObjectID,
        ref : 'cart'
    }
}, {timestamps : true});

module.exports = mongoose.model('user', userSchema);