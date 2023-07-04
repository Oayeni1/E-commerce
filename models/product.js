const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
    
    },

    category:{
        type: String,
        require: [true, "This field must not be empty"],
        enum:[
            "Shoes"
        ]
    }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;