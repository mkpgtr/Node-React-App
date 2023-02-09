const User = require('../models/user_model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {generateJWTToken,comparePassword} = require('../utilities/auth_utils.js')

router.post('/register',async(req,res)=>{



    const {firstName,lastName,email,password} = req.body;

   


    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    const userObjectWithHashedPassword = {firstName,lastName,email,password:hashedPassword};

    try {
        const user = await User.create({...userObjectWithHashedPassword});
        
        console.log(user,'created user')
        console.log(user._id,'user id')
        const myToken = generateJWTToken(user);
        


    

       
        res.status(200).json({user:user,msg:'user created successfully',myToken});
        
    } catch (error) {
        
        res.status(401).json({msg:error.message});
    }


    
})
router.post('/login',async(req,res)=>{


    const {email,password} = req.body;

    if(!email || !password){
        // ! this return keyword will help us to exit from this route when user tries to submit empty values.
        // ! I suffered a lot of hanging requests and my app was breaking when I threw just some error.
        // ! that's why I used return + res.status()......
        return res.status(401).json({msg:'Please dont leave any empty values'})
    }

    const user = await User.findOne({email})

    if(!user){
        throw new Error('Invalid credentials')
    }



    if(user){
        const isPasswordCorrect = await comparePassword(password,user.password);
        
       if(!isPasswordCorrect){

          return res.status(401).json({msg:'Invalid Credentials'})
       }
       const token = generateJWTToken(user);
        res.status(200).json({user:{firstName:user.firstName,lastName:user.lastName,token}, msg:'User logged in successfully'})
    }
    else{
        
        res.status(404).json({msg:'Some Error occured. please try again later'});
    }
})

module.exports = router;