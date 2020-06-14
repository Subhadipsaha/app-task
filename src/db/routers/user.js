const  express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth.js")
const router = new express.Router()
router.use(require('cookie-parser')());
router.get("/",(req,res)=>{
    res.render("index")
})

router.get('/add', (req, res) => {
    res.cookie('MyFirstCookie',"hello everyone").send("Login")
})

router.get("/show", (req,res)=>{
    res.send(req.cookies.Authorization)
    
})

router.post("/users",async (req,res)=>{
    const user = new User(req.body)
    const cookieOptions = {
        httpOnly: true,
        expires: 0 
       }
    try {
      await user.save()  
      const token = await user.generateAuthToken()
     //  res.status(201).send({user,token})
     // req.header.authorization=token
     res.cookie('Authorization',token)
    // res.cookie('Authorization', token, cookieOptions)
      res.render("taskHome")
    } catch (error) {
        res.send(error)
    }
})



router.get("/users/me",auth,async (req,res)=>{
    const currUser= req.user
   // res.send(req.user)
    res.render("showUser",currUser)
})

router.get("/users/:name",async (req,res)=>{
    
try {
    const user = await User.find({name:req.params.name})
    res.send(user)
} catch (error) {
    res.send(error)
}

})

router.patch("/users/me", auth ,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperator = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperator){
        return res.send(400).send({error:"Invalid Updates!"})
    }

    try {
       
       updates.forEach((update)=> req.user[update]=req.body[update])
       await req.user.save()
        
       res.send(req.user)
       
    } catch (error) {

        res.status(400).send(error)
        
    }
})

router.delete("/users/delete/me", auth, async (req,res)=>{
    try {
        await req.user.remove()
        //res.send(req.user)
        res.redirect("/")
        } catch (error) {
        res.status(500).send(error)
        }
})

router.post("/users/login", async (req,res)=>{
    // const cookieOptions = {
    //     httpOnly: true,
    //     expires: 0 
    //    }
try {
    const user = await User.findByCredentials(req.body.useremail,req.body.userpassword)
   const token = await user.generateAuthToken()
   //res.send({user,token})
    //req.header.authorization=token
   
    //console.log(req.cookies.Authorization);
    res.cookie('Authorization', token)
    console.log(token);
    
   res.render("taskHome")
   
} catch (error) {
    res.status(400).send()
}

    
})




router.post("/users/logout",auth, async (req,res)=>{
    try {
        res.clearCookie("Authorization")
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !=req.token
        })
        await req.user.save()
       // res.send()
       res.redirect("/")
    } catch (error) {
        res.status(500).send()
        
    }
})



router.post("/users/logoutAll", auth, async (req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
        
    }
})

module.exports=router