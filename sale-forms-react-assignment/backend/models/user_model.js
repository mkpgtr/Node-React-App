const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : {
        type:String,
        // ! this will perform the validation and throw errror when the firstName property on req.body will come as empty from frontend
        required:[true,'Please provide first name']
    },
    lastName:{
        type:String,
        required:[true,'Please Enter last name']
    },
    email:{
        type:String,
        required:[true,'Email is required. Please provide email ID'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please enter proper email ID'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required. Please enter your password']
        
    }

    
});


module.exports = mongoose.model('User',UserSchema);

