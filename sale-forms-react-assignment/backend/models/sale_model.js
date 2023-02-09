const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    product_name : {
        type:String,
        // ! this will perform the validation and throw errror when the firstName property on req.body will come as empty from frontend
        required:[true,'Please provide product name']
    },
    quantity:{
        type:Number,
        required:[true,'Please Enter quantity']
    },
    amount:{
        type:Number,
        required:[true,'amount is required. Please provide amount'],
    },

    

   

    
},{timestamps:true});


module.exports = mongoose.model('Sale',SaleSchema);

