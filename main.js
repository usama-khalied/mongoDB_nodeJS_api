const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());


// Connect operation
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,  
}, (err) => {
     if(!err) {
        console.log("Database is connected");

     }
     else {
        console.log("Db is not connected")
     }
}) 


// Creating schema 
const sch = {
    name:String,
    email:String,
    ID:Number
}
const monmodel = mongoose.model("NEWCOL",sch);


// post operation
app.post("/post",async(req,res) => {
    console.log("inside post function");
    const data = new monmodel({
        name:req.body.name,
        email:req.body.email,
        ID:req.body.ID
    });
    const val = await data.save();
    res.send(data)
});
app.listen(3000,() => {
    console.log("on Port 3000")
});


// get method
app.get('/view',(req,res) => {
    console.log("get Data is successfull");
    res.send("Get Data is completed");
});


// put method
app.put('/update:id',async(req,res) => {
     let updateID = req.params.ID;
     let updateName = req.body.name;
     let updateEmail = req.body.email;
     monmodel.findOneAndUpdate({
        id:updateID
     },{$set:{name:updateName,email:updateEmail}}
     ,{new:true},(err,data) => {
        if(err) {
            res.send("ERROR")
        }
        else {
            if(data==null){
                res.send("nothing found"); 
              }
              else {
                 res.send(data)
              }
        }
      
     })
})

