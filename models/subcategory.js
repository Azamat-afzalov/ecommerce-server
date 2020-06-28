const mongoose = require('mongoose');
const Category = require('./category');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    title : {
        type :  String,
        required : true
    },
    categoryId : {
        type : Schema.Types.ObjectID,
        ref : 'category'
    }
});

module.exports = mongoose.model('subcategory', subcategorySchema);