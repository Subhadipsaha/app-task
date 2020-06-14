const express = require("express")
require("./db/mongoose")
const userRouter = require("./db/routers/user")
const taskRouter = require("./db/routers/task")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser')
const app=express()
const port=process.env.PORT||3000




//
const publicDirectoryPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialsPath)
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(publicDirectoryPath))

//
// app.use((req,res,next)=>{
//     if (req.method==='GET') {
//         res.send("GET request are disabled")
//     } else {
//         next()
//     }

// })

// app.use((req,res,next)=>{
//     res.status(503).send("The site is under maintainence")
// })

//app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(cookieParser())



app.listen(port,()=>{
    console.log("Server started at "+ port);
    
})

// const Task = require('./db/models/task')
// const User = require('./db/models/user')

// const main = async () => {
//     const task = await Task.findById('5ee0ad9a9c26f515dcc30413')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//     // const user = await User.findById('5ee0acc65cc48c10083cf3b2')
//     // await user.populate('tasks').execPopulate()
//     // console.log(user.tasks)
// }

// main()

//console.log(req.header);
