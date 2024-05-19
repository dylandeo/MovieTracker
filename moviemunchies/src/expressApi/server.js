import express from 'express';
import cor from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import cors from "cors"
const uri = "mongodb+srv://test:test@movieserver.z9ruj1f.mongodb.net/?retryWrites=true&w=majority&appName=movieServer";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

 
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    mongoose.connect(uri, clientOptions);


const userSchema=new mongoose.Schema({
    userId:{
        type:Number,
        require:true
    },
    watchLater:[String],
    likeList:[String]
});
const User=new mongoose.model("User",userSchema);
/*
const u=new User({
    userId:1,
    watchLater:[],
    likeList:["yes","no"]
});
u.save();*/

const app = express();
const port = 4000;
app.use(cor());
app.use(express.json());
app.get('/api/findid',(req,res)=>{
    
    User.find({}).then((data)=>{
        
        let idnum=0;
        for(var i=0;i<data.length;i++){
            if(idnum<data[i].userId){
                idnum=data[i].userId;
            }
        }
        idnum++;
       res.send({"num":idnum});
    });

});
//creates new user
app.post('/api/cUser',(req,res)=>{
   
        const us=new User({
        userId:Number(req.body.id),
        watchLater:[],
        likeList:[]
    });
    us.save();
    
    res.send("created thing")
});


//gets user from id
app.get('/api/getUser',(req,res)=>{
    
    User.findOne({userId:Number(req.query.id)}).then((data)=>{
        res.send(data);
    });
      
});
//gets list from user
app.get('/api/getUserList',(req,res)=>{
    if(req.query.watch==="true"){
    User.findOne({userId:Number(req.query.id)}).then((data)=>{
        res.send(data.watchLater);
    });
    }
    else{
        User.findOne({userId:Number(req.query.id)}).then((data)=>{
            res.send(data.likeList);
        });  
    }
      
});
//updates a user list
app.post('/api/updateUser',(req,res)=>{
    //User.findOneAndUpdate({userId:3},{userId:300},{})
    
        if(req.body.watch==="true"){
            
            User.findOneAndUpdate({userId:Number(req.body.id)},{watchLater:req.body.upd},{}).then((dat)=>{

            });
            res.send("yes");
        }
        else if(req.body.like==="true"){
            

            User.findOneAndUpdate({userId:Number(req.body.id)},{likeList:req.body.upd},{}).then((dat)=>{

            });
            res.send("yes");

        }
        else{
            res.send("yes");
        }

    

});







app.listen(4000,()=>{
    console.log(`Server running on PORT: ${port}`);
    
    });
app.get('/api/singleid',(req,res)=>{
    req.query
    fetch("http://www.omdbapi.com/?i="+req.query.id+"&apikey=ac6774f1")
    .then(response=>response.json())
    .then(data=>res.send(data));
})

app.get('/api/singlename',(req,res)=>{
    fetch("http://www.omdbapi.com/?t="+req.query.name+"&apikey=ac6774f1")
    .then(response=>response.json())
    .then(data=>res.send(data));
})

app.get('/api/search',(req,res)=>{
    if(req.query.name.length<3){
        res.send("too little");
    }
    fetch("http://www.omdbapi.com/?s="+req.query.name+"&apikey=ac6774f1")
    .then(response=>response.json())
    .then(data=>res.send(data.Search));

})
