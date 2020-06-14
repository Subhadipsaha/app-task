require("../src/db/mongoose")
const Record = require("../src/db/models/record")

// Record.findByIdAndDelete("5eda7ec0d2ef9820e46c87f1").then((user)=>{
//     console.log(user)
//     return Record.countDocuments({Completed:false}).then((result)=>{
//         console.log(result)
        
//     }).catch((error)=>{
//         console.log(error);
        
//     })
    
// })

//5edb1664833f3918a4bbc4ec
// Record.countDocuments({Completed:false}).then((result)=>{
//     console.log(result)
    
// }).catch((error)=>{
//     console.log(error);
    
// })

const findDeleteById = async(id)=>{
    const findId = await Record.findByIdAndDelete({_id:id})
    const count = await Record.countDocuments({Completed:false})

    return count

}

findDeleteById("5edb1664833f3918a4bbc4ec").then((result)=>{
    console.log(result)
    
}).catch((e)=>{
    console.log(e);
    
})