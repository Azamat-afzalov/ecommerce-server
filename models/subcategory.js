const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    title : {
        type :  String,
        required : true
    }
});

module.exports = mongoose.model('subcategory', subcategorySchema);