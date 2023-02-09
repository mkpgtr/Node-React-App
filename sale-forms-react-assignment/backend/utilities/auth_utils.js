

// ! am so proud of this auth_utils file. it helps me to keep my routes and the call back functions clean.
// ! it gives me confidence that I can write basic functions which are meant for a specific task.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const generateJWTToken = (data)=>{
    console.log(data,'data param from generateJWT function')

    const token = jwt.sign({userId:data._id,user:{firstName:data.firstName,lastName:data.lastName}},'jwtSecret',{
        expiresIn:'30d'
    })

    return token;
}

// ! this thing could also have been done in the mongoose instance methods. but I chose to do it here.

const comparePassword = async(passwordFromRequest,passwordInTheDB)=>{
    const isPasswordCorrect = await bcrypt.compare(passwordFromRequest,passwordInTheDB);
    return isPasswordCorrect;
}





module.exports = {generateJWTToken,comparePassword};