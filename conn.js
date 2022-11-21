const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/GraphQL",{
    keepAlive: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useFindAndModify: false
}).then(()=>{
    console.log("Database Connected successfully");
}).catch((e)=>{
    console.log("Database Connection failed");
    console.log(e)
})