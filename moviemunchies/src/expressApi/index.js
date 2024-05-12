const express = require('express');
const app = express();

app.listen(3000,()=>{
console.log("eat my jorts");

});

app.get('/api/singleid',(req,res)=>{
    fetch("http://www.omdbapi.com/?i="+req.query.id+"&apikey=ac6774f1")
    .then(res=>res.json())
    .then(data=>res.send(data));
})
app.get('/api/singlename',(req,res)=>{
    fetch("http://www.omdbapi.com/?t="+req.query.name+"&apikey=ac6774f1")
    .then(res=>res.json())
    .then(data=>res.send(data));
})
app.get('/api/search',(req,res)=>{
    if(req.query.name.length<3){
        res.send("too little");
    }
    fetch("http://www.omdbapi.com/?s="+req.query.name+"&apikey=ac6774f1")
    .then(res=>res.json())
    .then(data=>res.send(data.Search));

})