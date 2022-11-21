const jwt = require('jsonwebtoken')

/* Create JWT token when user login */
const createJwtToken = user =>{
    return jwt.sign({user}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

module.exports = {createJwtToken}