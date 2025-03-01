const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
    image:String
    
});

module.exports= mongoose.model('products',productschema);