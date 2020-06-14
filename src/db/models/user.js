const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./task")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age: {
        type:Number,
        default:99,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide a valid Email")
            }
        }
       
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<6){
                throw new Error("Please provide password more than six character")
            }
        },
        validate(value){
            if(value.includes("password")){
                throw new Error("Please provide different password")

            }
        }
    },
    tokens : [{
        token : {
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


userSchema.virtual("tasks",{
    ref:"Task",
    localField:"_id",
    foreignField:"owner"
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"thisismysecret")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredentials = async (email,password) =>{
const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }
const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')) {
        user.password= await bcrypt.hash(user.password,8)
    }

})

userSchema.pre("remove", async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
})


const User = mongoose.model('User',userSchema)


module.exports=User