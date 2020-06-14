require("../src/db/mongoose")
const User = require("../src/db/models/user")

// User.findByIdAndUpdate("5eda7c726c0f5727f499a3d1",{age:80}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:99}).then((result)=>{
//         console.log(result);
        
//     }).catch((e)=>{
//         console.log(e);
        
//     })
// })


// User.countDocuments({age:99}).then((result)=>{
//     console.log(result)
    
// }).catch()

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount("5eda7c726c0f5727f499a3d1",56).then((count)=>{
    console.log(count)
    
}).catch((error)=>{
    console.log(error)
    
})