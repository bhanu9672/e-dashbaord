const mongoose = require( "mongoose" );

const productSchema = new mongoose.Schema({
    name : String,
    price : String,
    category : String,
    userid : String,
    company : String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model( "products",productSchema  );