import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

app.listen(3000,()=>{
console.log(`Server running on PORT: ${port}`);

});

app.get('/api/singleid',(req,res)=>{
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