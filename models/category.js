const mongoose = require('mongoose');
const Subcategory = require('./subcategory')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title : {
        type :  String,
        required : true
    },
    subcategories : [{
            subcategoryId : {
                type : Schema.Types.ObjectID,
                ref : 'subcategory'
            }
        }
    ]
});

module.exports = mongoose.model('category', categorySchema);