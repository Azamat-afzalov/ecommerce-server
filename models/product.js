const mongoose = require('mongoose');
const Category = require('./category');
const Subcategory = require('./subcategory');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required: true
    },
    category : {
        type : Schema.Types.ObjectID,
        ref : 'category',
        required : true
    },
    subcategory : {
        type : Schema.Types.ObjectID,
        ref : 'subcategory',
        required : true
    },
    images : [
        {
            path : String
        }
    ],
    amount : {
        type : Number
    },
    size : String,
    description: String,
    details : String,
    status : String
}, { timestamps : true });

module.exports = mongoose.model('product', productSchema);