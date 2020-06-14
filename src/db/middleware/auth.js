const jwt = require("jsonwebtoken")
const User = require("../models/user")

var cookieParser = require('cookie-parser')

const auth = async (req,res,next)=>{
   
   try {
     // console.log(req.cookies.Authorization)
   // const token = req.header("Authorization").replace("Bearer ","")
   const token = req.cookies.Authorization
    const decoded = jwt.verify(token,"thisismysecret")
    console.log(decoded);
    console.log("Auth try1");
   // console.log(req.header.authorization);
    
    
    const user = await User.findOne({_id:decoded._id, "tokens.token":token})
    if (!user) {
        throw new Error()
        console.log("Auth try2");
   } 
   console.log("Auth try3");
   req.token=token
   req.user = user
    next()
   } 
   
   catch (error) {
    res.status(401).send({error:"Please authenticate"})
    console.log("Auth catch");
       
   }
   

}

module.exports=auth