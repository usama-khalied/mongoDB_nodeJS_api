const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors');
app.use(express.json());
app.use(cors())

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
    ID:Number,
    phone:String,
    address:String,
    oid:String,
    price:Number,
    qty:Number
}
const monmodel = mongoose.model("NEWCOL",sch);


// post operation
app.post("/post",async(req,res) => {
    console.log("inside post function");
    const data = new monmodel({
        ID:req.body.ID,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        oid:req.body.oid,
        price:req.body.price,
        qty:req.body.qty
    });
    const val = await data.save();
    res.send(data)
});
app.listen(3000,() => {
    console.log("on Port 3000")
});


// get method
app.get('/view',(req,res) => {
    res.send("Hellow world");
});


// put method
app.put('/update/:id',async(req,res) => {
     let updateID = req.params.ID;
     let updateName = req.body.name;
     let updateEmail = req.body.email;
     let updatePhone = req.body.phone;
     let updateAddress = req.body.address;
     let updateOid     = req.body.oid;
     let updatePrice = req.body.price;
     let updateQty = req.body.qty;
     monmodel.findOneAndUpdate({
        id:updateID
     },{$set:{name:updateName,
        email:updateEmail,
        phone:updatePhone,
        address:updateAddress,
        oid:updateOid,
        price:updatePrice,
        qty:updateQty,
        id:updateID
    }}
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
});

// Fetch mathod 
app.get("/fetch/:id",(req,res) => {
    fetchID = req.params.id;
  
    monmodel.find(({ID:fetchID}), function(err,val){
        // res.send("Hellow")
        if(err) {
            res.send("ERROR")
        }
        else {
            if(val.length==0){
                res.send("nothing found"); 
              }
              else {
                 res.send(val)
              }
        }  
    })
})

// Delete Method
app.delete('/del/:id',function (req,res) {
let delID = req.params.id;
monmodel.findOneAndDelete(({id:delID}),function(err,docs){
    if(err) {
        res.send("ERROR");
    }
    else {

        if(docs==null) {
            res.send("WRONG ID")
            }
            else {
                res.send("Deleted");
            } 
    }
})
 
}) 