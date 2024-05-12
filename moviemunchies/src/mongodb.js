const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/MovieMunchies") // must be the name of the database!!!
.then(()=>{
    console.log("mongoDB connected");
})
.catch(()=>{
    console.log("failed to connect to mongoDB");
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("LogInCollection",LogInSchema) // name of the collection and the scheme it's associated with.

module.exports=collection