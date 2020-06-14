const mongoose = require("mongoose")
//URL for joining to localhost
//const connectionURL ="mongodb://127.0.0.1:27017/task-manager-api"

//URL for joining to MongoDB cloud
const connectionURL = "mongodb+srv://admin_subhadip:admin@contactkeeper-mqwwr.mongodb.net/task-manager-node?retryWrites=true&w=majority"

//MondoDB connection

mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})






