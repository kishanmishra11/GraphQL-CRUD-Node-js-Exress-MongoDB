const jwt = require('jsonwebtoken')

/* Authorization user function */
const authenticate = async (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1] || ""
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        // const decode = jwt.decode(token,process.env.JWT_SECRET)

        req.verifiedUser = verified.user
        console.log("verification success!",verified)
        next()
    }catch(err){
        console.log("verification failed!",err)
        next()
    }
}

module.exports = {authenticate}